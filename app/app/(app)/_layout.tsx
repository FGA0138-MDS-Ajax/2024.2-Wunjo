import { Redirect, Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import HomeIcon from '@/assets/images/HomeIcon';
import ChatIcon from '@/assets/images/ChatIcon';
import AwardIcon from '@/assets/images/AwardIcon';
import ProfileIcon from '@/assets/images/ProfileIcon';
import { TabBar } from '@/components/ui/tabBar';

const tabBarItemStyle = {
  paddingTop: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 12,
  margin: 4,
};

export default function TabLayout() {
  const session = true;

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1A1A2D',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarInactiveTintColor: '#1A1A2D',
        tabBarLabelStyle: {
          fontFamily: 'Itim_400Regular',
          fontSize: 12,
        },

        tabBarActiveBackgroundColor: '#173CAC10',
        tabBarItemStyle: {
          paddingTop: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 8,
        },

        tabBarStyle: {
          position: Platform.OS === 'ios' ? 'absolute' : 'relative',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          minHeight: 64,
          display: 'flex',
          flexDirection: 'row',
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Início',
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="(chat)"
        options={{
          title: 'Chat',
          tabBarIcon: () => <ChatIcon />,
        }}
      />
      <Tabs.Screen
        name="(rank)"
        options={{
          title: 'Ranking',
          tabBarIcon: () => <AwardIcon />,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Perfil',
          tabBarIcon: () => <ProfileIcon />,
        }}
      />
    </Tabs>
  );
}
