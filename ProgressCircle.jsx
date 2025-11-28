import React from 'react';
import { View } from 'react-native';

const ProgressCircle = ({
  size = 200,
  strokeWidth = 8,
  percentage = 0,
  color = '#6366F1',
  textColor = '#1F2937',
  children,
}) => {
  const radius = (size - strokeWidth) / 2;

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background circle */}
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: '#E5E7EB',
        }}
      />

      {/* Progress circle using View with rotating border */}
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: color,
          borderTopColor: color,
          borderRightColor: color,
          borderBottomColor: '#E5E7EB',
          borderLeftColor: '#E5E7EB',
          transform: [{ rotate: `${(percentage / 100) * 360}deg` }],
        }}
      />

      {/* Center content */}
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default ProgressCircle;
