import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

interface CommunityEngagementProps {
  setIsLoggedIn: (value: boolean) => void;
}

const CommunityEngagement: React.FC<CommunityEngagementProps> = ({ setIsLoggedIn }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'CommunityEngagement'>>();
  const [community, setCommunity] = useState<{
    socialMedia: { twitter: string; instagram: string; facebook: string };
    testimonials: string[];
    news: string[];
  } | null>(null);

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setCommunity({
        socialMedia: {
          twitter: 'https://twitter.com/digikoin',
          instagram: 'https://instagram.com/digikoin',
          facebook: 'https://facebook.com/digikoin',
        },
        testimonials: [
          '“DigiKoin makes learning about gold fun!” - Alex, 14',
          '“I love seeing how gold turns into tokens!” - Sam, 16',
        ],
        news: [
          'DigiKoin featured in Kids Finance Magazine (03/25)',
          'New educational video released (03/20)',
        ],
      });
    }, 1000);
  }, []);

  const handleProfile = () => {
    navigation.navigate('Profile', { setIsLoggedIn });
  };
  const handleSocialLink = (url: string) => {
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Unable to open social media link.'));
  };

  return (
    <ScrollView className="flex-1 bg-gray-200/85">
      {/* Header */}
      <View className="p-5 bg-[#050142] mt-[50px] mb-5">
        <Text className="text-2xl font-bold text-white text-center">Community Engagement</Text>
      </View>

      {/* Community Content */}
      <View className="p-5 bg-white/10 rounded-[10px] mx-5 mb-5 shadow-sm">
        <Text className="text-2xl font-bold text-[#454545] mb-3">Join Our Community</Text>
        <View className="flex-col gap-4">
          {/* Social Media Links */}
          <View className="flex-row justify-around mb-3">
            <TouchableOpacity onPress={() => handleSocialLink(community?.socialMedia.twitter || '')}>
              <Image source={require('../assets/twitter.png')} className="w-7 h-7" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSocialLink(community?.socialMedia.instagram || '')}>
              <Image source={require('../assets/instagram.png')} className="w-7 h-7" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSocialLink(community?.socialMedia.facebook || '')}>
              <Image source={require('../assets/facebook.png')} className="w-7 h-7" />
            </TouchableOpacity>
          </View>
          {/* Testimonials */}
          <View className="p-2 bg-white/80 rounded-lg shadow-sm">
            <Text className="text-sm font-bold uppercase text-[#454545] mb-1">User Testimonials</Text>
            {community ? (
              community.testimonials.map((testimonial, index) => (
                <Text key={index} className="text-base font-medium text-[#454545] mb-1">
                  {testimonial}
                </Text>
              ))
            ) : (
              <Text className="text-base font-medium">Loading...</Text>
            )}
          </View>
          {/* News & Media */}
          <View className="p-2 bg-white/80 rounded-lg shadow-sm">
            <Text className="text-sm font-bold uppercase text-[#454545] mb-1">News & Media Coverage</Text>
            {community ? (
              community.news.map((item, index) => (
                <Text key={index} className="text-base font-medium text-[#454545] mb-1">
                  {item}
                </Text>
              ))
            ) : (
              <Text className="text-base font-medium">Loading...</Text>
            )}
          </View>
        </View>
      </View>

      {/* Back to Profile */}
      <TouchableOpacity
        className="p-3 bg-[#050142] rounded-md mx-5 mb-5"
        onPress={handleProfile}
        accessibilityLabel="Back to Profile"
      >
        <Text className="text-white text-center text-base font-medium">Back to Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CommunityEngagement;