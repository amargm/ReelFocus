import React from 'react';
import { View } from 'react-native';
import { useApptileWindowDims } from 'apptile-core';
import DashboardContent from './DashboardContent';

export function ReactComponent({ model }) {
  const id = model.get('id');
  const { width, height } = useApptileWindowDims();

  // Get editable properties from model
  const cardBackgroundColor = model.get('cardBackgroundColor') || '#FFFFFF';
  const textColor = model.get('textColor') || '#1F2937';
  const accentColor = model.get('accentColor') || '#6366F1';
  const showEncouragingMessage = model.get('showEncouragingMessage') !== false;
  const refreshInterval = parseInt(model.get('refreshInterval')) || 1000;
  const paddingSize = model.get('paddingSize') || 'normal';

  return (
    <View
      nativeID={'rootElement-' + id}
      style={{
        width: '100%',
        height: height,
        backgroundColor: '#F9FAFB',
        flexGrow: 0,
      }}
    >
      <DashboardContent
        width={width}
        height={height}
        cardBackgroundColor={cardBackgroundColor}
        textColor={textColor}
        accentColor={accentColor}
        showEncouragingMessage={showEncouragingMessage}
        refreshInterval={refreshInterval}
        paddingSize={paddingSize}
      />
    </View>
  );
}

export const WidgetConfig = {
  cardBackgroundColor: '#FFFFFF',
  textColor: '#1F2937',
  accentColor: '#6366F1',
  showEncouragingMessage: true,
  refreshInterval: '1000',
  paddingSize: 'normal',
};

export const WidgetEditors = {
  basic: [
    {
      targets: [],
      type: 'colorInput',
      name: 'cardBackgroundColor',
      props: {
        label: 'Card Background Color',
      },
    },
    {
      targets: [],
      type: 'colorInput',
      name: 'textColor',
      props: {
        label: 'Text Color',
      },
    },
    {
      targets: [],
      type: 'colorInput',
      name: 'accentColor',
      props: {
        label: 'Accent Color (Primary)',
      },
    },
    {
      targets: [],
      type: 'checkbox',
      name: 'showEncouragingMessage',
      props: {
        label: 'Show Encouraging Message',
      },
    },
    {
      targets: [],
      type: 'codeInput',
      name: 'refreshInterval',
      props: {
        label: 'Refresh Interval (milliseconds)',
      },
    },
    {
      targets: [],
      type: 'radioGroup',
      name: 'paddingSize',
      props: {
        label: 'Padding Size',
        options: ['compact', 'normal', 'spacious'],
      },
    },
  ],
};

export const PropertySettings = {};

export const WrapperTileConfig = {
  name: 'Reel-Focus Dashboard',
  defaultProps: {
    cardBackgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    accentColor: '#6366F1',
    showEncouragingMessage: true,
    refreshInterval: '1000',
    paddingSize: 'normal',
  },
};
