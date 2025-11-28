import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { navigateToScreen, useApptileWindowDims } from 'apptile-core';
import { createStyles, getResponsiveValues } from './styles';
import ProgressCircle from './ProgressCircle';

const DashboardContent = ({
  width,
  height,
  cardBackgroundColor,
  textColor,
  accentColor,
  showEncouragingMessage,
  refreshInterval,
  paddingSize,
}) => {
  const dispatch = useDispatch();
  const [displayTimer, setDisplayTimer] = useState('00:00');
  const [displayCounter, setDisplayCounter] = useState(0);
  const screenDims = useApptileWindowDims();

  // Get session and config data from redux
  const reelFocusSession = useSelector(
    state => state.appModel.values.getIn(['reelFocusSession', 'value']),
    shallowEqual
  );

  const reelFocusConfig = useSelector(
    state => state.appModel.values.getIn(['reelFocusConfig', 'value']),
    shallowEqual
  );

  const responsiveValues = getResponsiveValues(width, paddingSize);
  const styles = createStyles(
    width,
    height,
    cardBackgroundColor,
    textColor,
    accentColor,
    responsiveValues
  );

  // Format time remaining to MM:SS format
  const formatTime = (seconds) => {
    if (!seconds || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Update timer display
  useEffect(() => {
    const interval = setInterval(() => {
      if (reelFocusSession) {
        const limitType = reelFocusSession.limitType || 'time';
        if (limitType === 'time') {
          const remaining = reelFocusSession.sessionTimeRemaining || 0;
          setDisplayTimer(formatTime(remaining));
        } else if (limitType === 'count') {
          const remaining = reelFocusSession.sessionCountRemaining || 0;
          setDisplayCounter(remaining);
        }
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [reelFocusSession, refreshInterval]);

  // Get monitored apps list
  const monitoredApps = reelFocusConfig?.monitoredApps || [];
  const maxSessionsDaily = reelFocusConfig?.maxSessionsDaily || 0;
  const sessionsUsedToday = reelFocusSession?.sessionsUsedToday || 0;
  const currentAppInFocus = reelFocusSession?.currentAppInFocus || null;
  const isMonitoring = monitoredApps.length > 0;
  const sessionProgress = maxSessionsDaily > 0 ? (sessionsUsedToday / maxSessionsDaily) * 100 : 0;
  
  // Calculate session progress percentage correctly
  const limitType = reelFocusSession?.limitType || 'time';
  const sessionTimeRemaining = reelFocusSession?.sessionTimeRemaining || 0;
  const sessionCountRemaining = reelFocusSession?.sessionCountRemaining || 0;
  
  let sessionProgressPercentage = 0;
  if (limitType === 'time') {
    const totalLimitSeconds = (reelFocusSession?.sessionLimitMinutes || reelFocusConfig?.defaultLimitMinutes || 0) * 60;
    sessionProgressPercentage = totalLimitSeconds > 0 ? (sessionTimeRemaining / totalLimitSeconds) * 100 : 0;
  } else if (limitType === 'count') {
    const totalLimitCount = reelFocusSession?.sessionLimitCount || 20;
    sessionProgressPercentage = totalLimitCount > 0 ? (sessionCountRemaining / totalLimitCount) * 100 : 0;
  }

  const encouragingMessages = [
    'Great job managing your focus!',
    "You're doing amazing! Keep it up!",
    'Stay focused, stay productive!',
    'Every session counts!',
    "You've got this!",
    'Focus is your superpower!',
    'Building better habits, one session at a time!',
  ];

  const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];

  const handleManageApps = () => {
    dispatch(navigateToScreen('AppSelection', {}));
  };

  const handleSettings = () => {
    dispatch(navigateToScreen('Settings', {}));
  };

  const handleHistory = () => {
    dispatch(navigateToScreen('History', {}));
  };

  // Determine layout based on screen width
  const isSmallScreen = width < 375;
  const isMediumScreen = width >= 375 && width < 600;
  const isLargeScreen = width >= 600;

  // Calculate button layout
  const buttonContainerStyle = isSmallScreen
    ? styles.buttonRowVertical
    : isMediumScreen
    ? styles.buttonRowHorizontal
    : styles.buttonRowHorizontal;

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingBottom: responsiveValues.padding }}
    >
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>Your focus journey today</Text>
      </View>

      {/* Session Status Card with Progress Circle */}
      <View style={styles.sessionCard}>
        <Text style={styles.sectionTitle}>Current Session</Text>

        {/* Current App Display */}
        {currentAppInFocus ? (
          <View style={styles.appFocusContainer}>
            <Text style={styles.statLabel}>Currently Monitoring:</Text>
            <Text style={[styles.appInFocusText, { color: accentColor }]}>
              {currentAppInFocus}
            </Text>
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No app currently in focus</Text>
          </View>
        )}

        {/* Progress Circle Display */}
        <View style={styles.progressCircleContainer}>
          <ProgressCircle
            size={responsiveValues.circleSize}
            strokeWidth={responsiveValues.strokeWidth}
            percentage={Math.min(Math.max(sessionProgressPercentage, 0), 100)}
            color={accentColor}
            textColor={textColor}
          >
            <View style={styles.timerDisplayCenter}>
              {limitType === 'time' ? (
                <>
                  <Text style={[styles.timerValue, { color: accentColor }]}>{displayTimer}</Text>
                  <Text style={styles.timerLabel}>Time Remaining</Text>
                </>
              ) : (
                <>
                  <Text style={[styles.timerValue, { color: accentColor }]}>{displayCounter}</Text>
                  <Text style={styles.timerLabel}>Sessions Left</Text>
                </>
              )}
            </View>
          </ProgressCircle>
        </View>
      </View>

      {/* Monitoring Status Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Monitoring Status</Text>
        <View
          style={[
            styles.statusBadge,
            isMonitoring ? styles.statusBadgeActive : styles.statusBadgeInactive,
          ]}
        >
          <View
            style={[
              styles.statusDot,
              !isMonitoring && styles.statusDotInactive,
            ]}
          />
          <Text
            style={[
              styles.statusText,
              !isMonitoring && styles.statusTextInactive,
            ]}
          >
            {isMonitoring ? 'Monitoring Active' : 'No Apps Selected'}
          </Text>
        </View>

        {isMonitoring && (
          <View>
            <Text style={[styles.statLabel, { marginTop: responsiveValues.padding }]}>
              Monitored Apps ({monitoredApps.length})
            </Text>
            <View style={styles.appsGrid}>
              {monitoredApps.map((app, index) => (
                <View key={index} style={styles.appBadge}>
                  <Text style={styles.appBadgeText}>{app}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Daily Statistics Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Daily Statistics</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statLabel}>Sessions Used Today</Text>
          <Text style={styles.statValue}>
            {sessionsUsedToday} / {maxSessionsDaily}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(sessionProgress, 100)}%`, backgroundColor: accentColor },
            ]}
          />
        </View>
        <Text style={[styles.statLabel, { marginTop: responsiveValues.smallPadding }]}>
          {Math.round(sessionProgress)}% of daily limit used
        </Text>
      </View>

      {/* Encouraging Message */}
      {showEncouragingMessage && (
        <View style={styles.encouragingCard}>
          <Text style={[styles.encouragingMessage, { color: accentColor }]}>
            {randomMessage}
          </Text>
        </View>
      )}

      {/* Navigation Buttons */}
      <View style={buttonContainerStyle}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton, { backgroundColor: accentColor }]}
          onPress={handleManageApps}
          nativeID="dashboard-TouchableOpacity-ManageApps"
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Manage Apps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleSettings}
          nativeID="dashboard-TouchableOpacity-Settings"
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.tertiaryButton]}
          onPress={handleHistory}
          nativeID="dashboard-TouchableOpacity-History"
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Padding */}
      <View style={{ height: responsiveValues.padding }} />
    </ScrollView>
  );
};

export default DashboardContent;
