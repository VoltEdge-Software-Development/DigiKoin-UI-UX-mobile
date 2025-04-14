import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

// Define metrics interface
interface Metrics {
  oreProcessed: string;
  goldExtracted: string;
  goldPurity: string;
  processingEfficiency: string;
  temperature: string;
  dustLevels: string;
  waterUsage: string;
  waterPH: string;
  machineUptime: string;
  motorRPM: string;
  powerConsumption: string;
  maintenanceAlert: string;
  goldTransport: string;
  perimeterStatus: string;
  personnel: string;
  goldPrice: string;
  goldInventory: string;
  estimatedRevenue: string;
  safetyAlerts: string;
  emissions: string;
  complianceRate: string;
  miningOutput: string;
  energyConsumption: string;
  carbonFootprint: string;
  currencySupply: string;
  goldToCurrencyRatio: string;
  transactionVolume: string;
  cameraFeeds: string;
  notifications: string;
}

const GoldStorage: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setMetrics({
        oreProcessed: "500 tons",
        goldExtracted: "2.5 kg",
        goldPurity: "99.9%",
        processingEfficiency: "85%",
        temperature: "22°C",
        dustLevels: "10 µg/m³",
        waterUsage: "1000 L/h",
        waterPH: "7.2",
        machineUptime: "98%",
        motorRPM: "1500",
        powerConsumption: "300 kW",
        maintenanceAlert: "None",
        goldTransport: "In Transit (Dubai)",
        perimeterStatus: "Secure",
        personnel: "25 On-Site",
        goldPrice: "$65/g",
        goldInventory: "150 kg",
        estimatedRevenue: "$9.75M",
        safetyAlerts: "None",
        emissions: "50 kg CO2/day",
        complianceRate: "100%",
        miningOutput: "0.5 kg/day",
        energyConsumption: "500 kWh/day",
        carbonFootprint: "200 kg CO2",
        currencySupply: "25M Tokens",
        goldToCurrencyRatio: "1 kg = 10,000 Tokens",
        transactionVolume: "$1.8M/day",
        cameraFeeds: "Active",
        notifications: "2 Active",
      });
    }, 1000);

    // No DOM animations in React Native; could use Animated API if needed
  }, []);

  return (
    <ScrollView className="flex-1 p-5 bg-gray-200/85">
      {/* Dashboard Grid */}
      <View className="flex-col gap-5">
        {/* 1. Gold Production & Processing Data */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">
            Gold Production & Processing
          </Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Ore Weight Processed:</Text>{" "}
              {metrics?.oreProcessed ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Gold Extracted:</Text>{" "}
              {metrics?.goldExtracted ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Gold Purity Levels:</Text>{" "}
              {metrics?.goldPurity ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Processing Efficiency:</Text>{" "}
              {metrics?.processingEfficiency ?? "Loading..."}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">
              Processing Throughput Chart
            </Text>
          </View>
        </View>

        {/* 2. Environmental & Site Conditions */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">
            Environmental Conditions
          </Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Temperature:</Text>{" "}
              {metrics?.temperature ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Dust Levels:</Text>{" "}
              {metrics?.dustLevels ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Water Usage:</Text>{" "}
              {metrics?.waterUsage ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Water pH:</Text>{" "}
              {metrics?.waterPH ?? "Loading..."}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">
              Environmental Trends Graph
            </Text>
          </View>
        </View>

        {/* 3. Equipment & Machinery Monitoring */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">
            Equipment Monitoring
          </Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Machine Uptime:</Text>{" "}
              {metrics?.machineUptime ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Motor RPM:</Text>{" "}
              {metrics?.motorRPM ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Power Consumption:</Text>{" "}
              {metrics?.powerConsumption ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Maintenance Alert:</Text>{" "}
              {metrics?.maintenanceAlert ?? "Loading..."}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">
              Equipment Status Dashboard
            </Text>
          </View>
        </View>

        {/* 4. Security & Logistics Tracking */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">
            Security & Logistics
          </Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Gold Transport:</Text>{" "}
              {metrics?.goldTransport ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Perimeter Status:</Text>{" "}
              {metrics?.perimeterStatus ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Personnel:</Text>{" "}
              {metrics?.personnel ?? "Loading..."}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Transport Tracking Map</Text>
          </View>
        </View>

        {/* 5. Financial & Market Insight */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">
            Financial Insight
          </Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Live Gold Price:</Text>{" "}
              {metrics?.goldPrice ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Gold Inventory:</Text>{" "}
              {metrics?.goldInventory ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Estimated Revenue:</Text>{" "}
              {metrics?.estimatedRevenue ?? "Loading..."}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Market Price Trend</Text>
          </View>
        </View>

        {/* 6. Compliance & Safety Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">
            Compliance & Safety
          </Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Safety Alerts:</Text>{" "}
              {metrics?.safetyAlerts ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Emissions:</Text>{" "}
              {metrics?.emissions ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Compliance Rate:</Text>{" "}
              {metrics?.complianceRate ?? "Loading..."}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Safety Dashboard</Text>
          </View>
        </View>

        {/* 7. Mining Operations Data */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">
            Mining Operations
          </Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Mining Output:</Text>{" "}
              {metrics?.miningOutput ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Energy Consumption:</Text>{" "}
              {metrics?.energyConsumption ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Carbon Footprint:</Text>{" "}
              {metrics?.carbonFootprint ?? "Loading..."}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Output Trends Graph</Text>
          </View>
        </View>

        {/* 8. Blockchain and Currency Data */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">
            Blockchain Data
          </Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Currency Supply:</Text>{" "}
              {metrics?.currencySupply ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Gold-to-Currency Ratio:</Text>{" "}
              {metrics?.goldToCurrencyRatio ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Transaction Volume:</Text>{" "}
              {metrics?.transactionVolume ?? "Loading..."}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">
              Transaction Volume Chart
            </Text>
          </View>
        </View>

        {/* 9. User-Facing Features */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">
            User Features
          </Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Camera Feeds:</Text>{" "}
              {metrics?.cameraFeeds ?? "Loading..."}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Notifications:</Text>{" "}
              {metrics?.notifications ?? "Loading..."}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Historical Data Trends</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default GoldStorage;
