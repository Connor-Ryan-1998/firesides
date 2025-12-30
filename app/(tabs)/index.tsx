import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const FRIENDS = [
  { 
    id: '1', 
    name: 'Sarah Miller', 
    status: 'healthy', 
    lastContact: '2 days ago', 
    vibe: 'Inner Circle',
    note: 'Loves coffee and sci-fi'
  },
  {
    id: '2', 
    name: 'Mike Ross', 
    status: 'attention', 
    lastContact: '3 weeks ago', 
    vibe: 'College Buddy',
    note: 'Ask about his new job'
  },
  {
    id: '3', 
    name: 'Jessica Pearson', 
    status: 'healthy', 
    lastContact: '5 days ago', 
    vibe: 'Mentor',
    note: 'Scheduled lunch next month'
  },
  {
    id: '4', 
    name: 'Louis Litt', 
    status: 'attention', 
    lastContact: '1 month ago', 
    vibe: 'Casual',
    note: 'Remember his cat\'s birthday'
  },
];

const FriendCard = ({ item }) => {
  const isHealthy = item.status === 'healthy';
  const bgColor = isHealthy ? 'bg-green-50' : 'bg-amber-50';
  const borderColor = isHealthy ? 'border-green-200' : 'border-amber-200';
  const iconColor = isHealthy ? '#4ade80' : '#fbbf24'; // green-400 : amber-400
  const textColor = isHealthy ? 'text-green-800' : 'text-amber-800';

  return (
    <View className={`mb-4 mx-4 p-4 rounded-xl border ${bgColor} ${borderColor} shadow-sm flex-row items-center justify-between`}>
      <View className="flex-1">
        <View className="flex-row items-center mb-1">
          <Text className={`text-lg font-bold text-slate-800 mr-2`}>{item.name}</Text>
          <View className={`px-2 py-0.5 rounded-full ${isHealthy ? 'bg-green-100' : 'bg-amber-100'}`}>
             <Text className={`text-xs ${textColor} font-medium`}>{item.vibe}</Text>
          </View>
        </View>
        <Text className="text-slate-500 text-sm mb-2">{item.note}</Text>
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={14} color="#64748b" />
          <Text className="text-slate-500 text-xs ml-1">Last spoke: {item.lastContact}</Text>
        </View>
      </View>
      
      <View className="items-center justify-center pl-2">
        <Ionicons name={isHealthy ? "leaf" : "flame"} size={24} color={iconColor} />
      </View>
    </View>
  );
};

export default function GardenScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-100">
        <View>
           <Text className="text-2xl font-bold text-slate-800">My Garden</Text>
           <Text className="text-slate-500 text-sm">Nurture your connections</Text>
        </View>
        <TouchableOpacity className="bg-slate-100 p-2 rounded-full">
           <Ionicons name="search" size={20} color="#334155" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={FRIENDS}
        renderItem={({ item }) => <FriendCard item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity 
        className="absolute bottom-6 right-6 bg-slate-800 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={{ elevation: 5 }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}