import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { Dispatch, SetStateAction } from 'react';
import tw from 'twrnc';

interface CommunityEngagementProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  toggleMode: () => Promise<void>;
  userType: 'minor' | 'investor' | 'admin' | null;
  navigation: StackNavigationProp<RootStackParamList, 'CommunityEngagement'>;
}

const CommunityEngagement: React.FC<CommunityEngagementProps> = ({ setIsLoggedIn, darkMode, toggleMode, userType, navigation }) => {
  const [community, setCommunity] = useState<{
    socialMedia: { twitter: string; instagram: string; facebook: string };
    testimonials: string[];
    news: string[];
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    navigation.navigate('Profile', { setIsLoggedIn, darkMode, toggleMode, userType });
  };

  const handleSocialLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      setErrorMessage('Unable to open social media link.');
      setTimeout(() => setErrorMessage(null), 3000); // Clear after 3 seconds
    });
  };

  return (
    <ScrollView style={tw`flex-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200/85'}`}>
      {/* Header */}
      <View style={tw`p-5 ${darkMode ? 'bg-gray-900' : 'bg-[#050142]'} mt-[50px] mb-5`}>
        <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-white'} text-center`}>
          Community Engagement
        </Text>
      </View>

      {/* Error Message */}
      {errorMessage && (
        <View style={tw`p-2.5 ${darkMode ? 'bg-red-600' : 'bg-red-100'} mx-5 mb-2.5 rounded-lg`}>
          <Text style={tw`text-center ${darkMode ? 'text-white' : 'text-red-600'}`}>{errorMessage}</Text>
        </View>
      )}

      {/* Community Content */}
      <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] mx-5 mb-5 shadow-sm`}>
        <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
          Join Our Community
        </Text>
        <View style={tw`flex-col gap-4`}>
          {/* Social Media Links */}
          <View style={tw`flex-row justify-around mb-3`}>
            <TouchableOpacity onPress={() => handleSocialLink(community?.socialMedia.twitter || '')}>
              <Image source={require('../assets/twitter.png')} style={tw`w-7 h-7`} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSocialLink(community?.socialMedia.instagram || '')}>
              <Image source={require('../assets/instagram.png')} style={tw`w-7 h-7`} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSocialLink(community?.socialMedia.facebook || '')}>
              <Image source={require('../assets/facebook.png')} style={tw`w-7 h-7`} />
            </TouchableOpacity>
          </View>
          {/* Testimonials */}
          <View style={tw`p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
            <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-white' : 'text-[#454545]'} mb-1`}>
              User Testimonials
            </Text>
            {community ? (
              community.testimonials.map((testimonial, index) => (
                <Text
                  key={index}
                  style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-[#454545]'} mb-1`}
                >
                  {testimonial}
                </Text>
              ))
            ) : (
              <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-[#454545]'}`}>
                Loading...
              </Text>
            )}
          </View>
          {/* News & Media */}
          <View style={tw`p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
            <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-white' : 'text-[#454545]'} mb-1`}>
              News & Media Coverage
            </Text>
            {community ? (
              community.news.map((item, index) => (
                <Text
                  key={index}
                  style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-[#454545]'} mb-1`}
                >
                  {item}
                </Text>
              ))
            ) : (
              <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-[#454545]'}`}>
                Loading...
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Back to Profile */}
      <TouchableOpacity
        style={tw`p-3 ${darkMode ? 'bg-gray-900' : 'bg-[#050142]'} rounded-md mx-5 mb-5`}
        onPress={handleProfile}
        accessibilityLabel="Back to Profile"
      >
        <Text style={tw`text-white text-center text-base font-medium`}>Back to Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CommunityEngagement;