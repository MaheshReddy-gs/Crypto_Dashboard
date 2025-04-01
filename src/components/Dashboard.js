import React, { useState, useEffect } from 'react';
import { Zap, Gauge, Users, BarChartIcon, Moon, Sun, TrendingUp, DollarSign, CreditCard, Activity } from 'lucide-react';
import { Separator } from './Separator';
import { AlertCard } from './AlertCard';
import { InfoCard } from './InfoCard';
import { AreaChartComponent } from './charts/AreaChartComponent';
import { LineChartComponent } from './charts/LineChartComponent';
import { BarChartComponent } from './charts/BarChartComponent';
import { StackedBarChartComponent } from './charts/StackedBarChartComponent';
import { PieChartComponent } from './charts/PieChartComponent';
import { ComposedChartComponent } from './charts/ComposedChartComponent';
import { DataTableComponent } from './DataTableComponent';
import { DataCard } from './DataCard';
import { Button } from './Button';

const Dashboard = () => {
    const [marketData, setMarketData] = useState([]);
    const [coinData, setCoinData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    // Sample data for top coins (will be replaced with real data)
    const [topCoinsData, setTopCoinsData] = useState([
        { name: 'Bitcoin', value: 40000 },
        { name: 'Ethereum', value: 2500 },
        { name: 'Cardano', value: 1.5 },
        { name: 'Solana', value: 100 },
    ]);

    // Table columns definition
    const coinTableColumns = [
        { title: 'Coin', key: 'name' },
        { title: 'Price (USD)', key: 'value' },
        { title: '24h Change %', key: 'change' },
    ];

    // Initialize dark mode from localStorage
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);
        
        if (savedDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
        
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        const fetchCryptoData = async () => {
            setIsLoading(true);
            try {
                // Fetch global market data
                const globalResponse = await fetch('https://api.coingecko.com/api/v3/global');
                const globalData = await globalResponse.json();
                
                // Fetch top 20 coins data
                const coinsResponse = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h');
                const coinsData = await coinsResponse.json();
                
                // Fetch market chart data for Bitcoin (for historical charts)
                const btcChartResponse = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily');
                const btcChartData = await btcChartResponse.json();
                
                // Transform chart data for visualization
                const transformedMarketData = transformMarketChartData(btcChartData);
                setMarketData(transformedMarketData);
                
                // Transform coins data for tables and charts
                const transformedCoinsData = transformCoinsData(coinsData);
                setCoinData(transformedCoinsData);
                
                // Extract top 5 coins for pie chart
                const topFiveCoins = transformedCoinsData
                    .slice(0, 5)
                    .map(coin => ({ name: coin.name, value: Math.round(coin.marketCap / 1000000) })); // Value in millions
                setTopCoinsData(topFiveCoins);
                
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching crypto data:', err);
                setError('Failed to fetch data. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchCryptoData();
        
        // Set up interval to refresh data every 5 minutes
        const interval = setInterval(() => {
            fetchCryptoData();
        }, 300000); // 5 minutes
        
        return () => clearInterval(interval);
    }, []);

    // Transform market chart data for time series charts
    const transformMarketChartData = (data) => {
        const { prices, market_caps, total_volumes } = data;
        const result = [];
        
        // Convert timestamps to dates and pair with corresponding values
        for (let i = 0; i < prices.length; i++) {
            const date = new Date(prices[i][0]);
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
            
            result.push({
                name: formattedDate,
                price: prices[i][1],
                marketCap: market_caps[i] ? market_caps[i][1] : 0,
                volume: total_volumes[i] ? total_volumes[i][1] : 0,
                // For the charts
                value: prices[i][1],
                uv: prices[i][1],
                pv: total_volumes[i] ? total_volumes[i][1] / 1000000000 : 0, // Volume in billions
                amt: market_caps[i] ? market_caps[i][1] / 1000000000 : 0, // Market cap in billions
                profit: prices[i][1] > (result[i-1]?.price || 0) ? prices[i][1] - (result[i-1]?.price || 0) : 0,
                loss: prices[i][1] < (result[i-1]?.price || 0) ? (result[i-1]?.price || 0) - prices[i][1] : 0,
            });
        }
        
        return result;
    };
    
    // Transform coins data for tables and charts
    const transformCoinsData = (coinsData) => {
        return coinsData.map(coin => ({
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            value: coin.current_price,
            marketCap: coin.market_cap,
            volume: coin.total_volume,
            change: coin.price_change_percentage_24h,
            profit: coin.price_change_percentage_24h > 0 ? coin.price_change_percentage_24h : 0,
            loss: coin.price_change_percentage_24h < 0 ? Math.abs(coin.price_change_percentage_24h) : 0,
            image: coin.image,
        }));
    };

    // Show loading state or error message
    if (error) {
        return (
            <div className="p-4 md:p-6 lg:p-8 flex justify-center items-center min-h-screen">
                <AlertCard title="Error" content={error} variant="error" />
            </div>
        );
    }

    // Get latest market data
    const getMarketSummary = () => {
        if (marketData.length === 0 || !coinData.length) {
            return { price: 0, volume: 0, marketCap: 0, dominance: 0 };
        }
        
        const latest = marketData[marketData.length - 1];
        const previous = marketData[marketData.length - 2] || { price: 0, volume: 0, marketCap: 0 };
        
        // Calculate 24h changes
        const priceChange = ((latest.price - previous.price) / previous.price * 100).toFixed(2);
        const volumeChange = ((latest.volume - previous.volume) / previous.volume * 100).toFixed(2);
        const marketCapChange = ((latest.marketCap - previous.marketCap) / previous.marketCap * 100).toFixed(2);
        
        // Get Bitcoin dominance from the first coin (assuming it's BTC)
        const btcDominance = coinData.length > 0 ? (coinData[0].marketCap / coinData.reduce((sum, coin) => sum + coin.marketCap, 0) * 100).toFixed(2) : 0;
        
        return {
            price: latest.price,
            volume: latest.volume,
            marketCap: latest.marketCap,
            dominance: Number(btcDominance),
            priceChange: Number(priceChange),
            volumeChange: Number(volumeChange),
            marketCapChange: Number(marketCapChange)
        };
    };
    
    const marketSummary = getMarketSummary();

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
                    Crypto Dashboard
                </h1>
                <Button 
                    onClick={toggleDarkMode} 
                    variant="ghost" 
                    className="p-2 rounded-full"
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {darkMode ? (
                        <Sun className="h-5 w-5 text-yellow-500" />
                    ) : (
                        <Moon className="h-5 w-5 text-blue-700" />
                    )}
                </Button>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DataCard
                    title="Bitcoin Price"
                    value={marketSummary.price}
                    change={marketSummary.priceChange}
                    icon={<DollarSign className="w-5 h-5 text-blue-500" />}
                    isLoading={isLoading}
                    prefix="$"
                    description="vs. previous day"
                />
                <DataCard
                    title="24h Volume"
                    value={Math.round(marketSummary.volume / 1000000000)}
                    change={marketSummary.volumeChange}
                    icon={<Activity className="w-5 h-5 text-green-500" />}
                    isLoading={isLoading}
                    prefix="$"
                    suffix="B"
                    description="vs. previous day"
                />
                <DataCard
                    title="Market Cap"
                    value={Math.round(marketSummary.marketCap / 1000000000)}
                    change={marketSummary.marketCapChange}
                    icon={<CreditCard className="w-5 h-5 text-purple-500" />}
                    isLoading={isLoading}
                    prefix="$"
                    suffix="B"
                    description="vs. previous day"
                />
                <DataCard
                    title="BTC Dominance"
                    value={marketSummary.dominance}
                    change={0}
                    icon={<TrendingUp className="w-5 h-5 text-orange-500" />}
                    isLoading={isLoading}
                    suffix="%"
                    description="of total market"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AreaChartComponent data={marketData} title="Bitcoin Price (30 Days)" />
                <LineChartComponent data={marketData} title="Trading Volume" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BarChartComponent data={coinData.slice(0, 10)} title="Top 10 Cryptocurrencies" />
                <StackedBarChartComponent
                    data={coinData.slice(0, 10)}
                    title="24h Price Gain/Loss (%)"
                    dataKeys={{ positive: 'profit', negative: 'loss' }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PieChartComponent data={topCoinsData} title="Market Cap Distribution (in $M)" />
                <ComposedChartComponent
                    data={marketData}
                    title="Price, Volume & Market Cap"
                />
            </div>
            <div className="grid grid-cols-1 gap-6">
                <DataTableComponent data={coinData} title="Cryptocurrency Data" columns={coinTableColumns} />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <InfoCard title="Dashboard Information" content="This dashboard provides cryptocurrency market data from around the world. Data is updated every 5 minutes from CoinGecko API." />
                    <AlertCard title="Market Notice" content="Cryptocurrency markets are volatile. Historical performance may not predict future results." variant="warning" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 