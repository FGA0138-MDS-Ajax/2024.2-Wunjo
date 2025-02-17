import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import StarWhite from '@/assets/images/StarWhite';
import StarGold from '@/assets/images/StarGold';

interface StarRatingProps {
  maxStars?: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  size = 40,
  onRatingChange,
}) => {
  const [finalRating, setFinalRating] = useState(0);

  return (
    <View style={{ flexDirection: 'row', padding: 10 }}>
      {Array.from({ length: maxStars }, (_, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setFinalRating(index + 1);
              onRatingChange && onRatingChange(index + 1);
            }}
          >
            {index < finalRating ? (
              <StarGold size={size} />
            ) : (
              <StarWhite size={size} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default StarRating;
