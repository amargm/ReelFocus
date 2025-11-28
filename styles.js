export const getResponsiveValues = (width, paddingSize = 'normal') => {
  // Base scale: 375px width
  const baseWidth = 375;
  const scale = width / baseWidth;

  // Padding multipliers based on size preference
  const paddingMultipliers = {
    compact: 0.75,
    normal: 1,
    spacious: 1.25,
  };

  const multiplier = paddingMultipliers[paddingSize] || 1;

  return {
    // Base spacing (8dp unit)
    spacing: Math.max(4, 8 * scale * multiplier),
    smallPadding: Math.max(6, 12 * scale * multiplier),
    padding: Math.max(12, 16 * scale * multiplier),
    largePadding: Math.max(16, 24 * scale * multiplier),
    extraLargePadding: Math.max(20, 32 * scale * multiplier),

    // Font sizes
    fontSize12: Math.max(10, 12 * scale),
    fontSize14: Math.max(12, 14 * scale),
    fontSize16: Math.max(14, 16 * scale),
    fontSize18: Math.max(16, 18 * scale),
    fontSize24: Math.max(20, 24 * scale),
    fontSize28: Math.max(24, 28 * scale),
    fontSize32: Math.max(28, 32 * scale),
    fontSize40: Math.max(34, 40 * scale),
    fontSize56: Math.max(48, 56 * scale),

    // Border radius
    borderRadius8: Math.max(6, 8 * scale),
    borderRadius12: Math.max(10, 12 * scale),
    borderRadius16: Math.max(12, 16 * scale),
    borderRadius20: Math.max(16, 20 * scale),

    // Circle sizes
    circleSize: Math.max(140, 200 * scale),
    strokeWidth: Math.max(6, 8 * scale),

    // Minimum touch target (44dp)
    minTouchTarget: 44,
  };
};

export const createStyles = (
  width,
  height,
  cardBg,
  textColor,
  accentColor,
  responsive
) => {
  const isSmallScreen = width < 375;
  const isMediumScreen = width >= 375 && width < 600;
  const isLargeScreen = width >= 600;

  return {
    scrollContainer: {
      width: '100%',
      backgroundColor: '#F9FAFB',
      paddingHorizontal: responsive.padding,
      paddingTop: responsive.padding,
    },

    headerSection: {
      marginBottom: responsive.largePadding,
      paddingHorizontal: responsive.smallPadding,
    },

    welcomeText: {
      fontSize: responsive.fontSize28,
      fontWeight: '700',
      color: textColor,
      marginBottom: responsive.smallPadding,
    },

    subText: {
      fontSize: responsive.fontSize14,
      color: '#6B7280',
      marginBottom: responsive.padding,
    },

    card: {
      backgroundColor: cardBg,
      borderRadius: responsive.borderRadius16,
      padding: responsive.padding,
      marginBottom: responsive.padding,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },

    sessionCard: {
      backgroundColor: cardBg,
      borderRadius: responsive.borderRadius16,
      padding: responsive.largePadding,
      marginBottom: responsive.padding,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
      borderLeftWidth: 4,
      borderLeftColor: accentColor,
    },

    appFocusContainer: {
      marginVertical: responsive.padding,
      paddingHorizontal: responsive.smallPadding,
    },

    appInFocusText: {
      fontSize: responsive.fontSize18,
      fontWeight: '700',
      marginTop: responsive.smallPadding,
    },

    emptyStateContainer: {
      paddingVertical: responsive.padding,
      paddingHorizontal: responsive.smallPadding,
    },

    emptyStateText: {
      fontSize: responsive.fontSize14,
      color: '#9CA3AF',
      fontStyle: 'italic',
    },

    progressCircleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: responsive.largePadding,
      minHeight: responsive.circleSize + responsive.padding,
    },

    timerDisplayCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    timerValue: {
      fontSize: responsive.fontSize56,
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
    },

    timerLabel: {
      fontSize: responsive.fontSize12,
      color: '#6B7280',
      marginTop: responsive.smallPadding,
      textAlign: 'center',
    },

    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: responsive.padding,
      paddingVertical: responsive.smallPadding,
      borderRadius: responsive.borderRadius20,
      marginVertical: responsive.padding,
      alignSelf: 'flex-start',
      minHeight: 44,
      justifyContent: 'center',
    },

    statusBadgeActive: {
      backgroundColor: '#ECFDF5',
    },

    statusBadgeInactive: {
      backgroundColor: '#FEF2F2',
    },

    statusDot: {
      width: responsive.spacing * 1.5,
      height: responsive.spacing * 1.5,
      borderRadius: responsive.spacing * 0.75,
      marginRight: responsive.smallPadding,
      backgroundColor: '#10B981',
    },

    statusDotInactive: {
      backgroundColor: '#EF4444',
    },

    statusText: {
      fontSize: responsive.fontSize14,
      fontWeight: '600',
      color: '#059669',
    },

    statusTextInactive: {
      color: '#DC2626',
    },

    sectionTitle: {
      fontSize: responsive.fontSize16,
      fontWeight: '700',
      color: textColor,
      marginBottom: responsive.smallPadding,
      marginTop: responsive.smallPadding,
    },

    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.padding,
    },

    statLabel: {
      fontSize: responsive.fontSize14,
      color: '#6B7280',
    },

    statValue: {
      fontSize: responsive.fontSize16,
      fontWeight: '700',
      color: textColor,
    },

    progressBar: {
      height: responsive.spacing * 1.5,
      backgroundColor: '#E5E7EB',
      borderRadius: responsive.borderRadius12,
      overflow: 'hidden',
      marginTop: responsive.smallPadding,
    },

    progressFill: {
      height: '100%',
      borderRadius: responsive.borderRadius12,
    },

    appsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: responsive.smallPadding,
      gap: responsive.smallPadding,
    },

    appBadge: {
      backgroundColor: '#F3F4F6',
      paddingHorizontal: responsive.smallPadding,
      paddingVertical: responsive.spacing,
      borderRadius: responsive.borderRadius8,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      minHeight: 32,
      justifyContent: 'center',
    },

    appBadgeText: {
      fontSize: responsive.fontSize12,
      color: textColor,
      fontWeight: '500',
    },

    encouragingCard: {
      backgroundColor: cardBg,
      borderRadius: responsive.borderRadius16,
      padding: responsive.padding,
      marginBottom: responsive.padding,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },

    encouragingMessage: {
      fontSize: responsive.fontSize14,
      fontWeight: '600',
      fontStyle: 'italic',
      textAlign: 'center',
    },

    buttonRowVertical: {
      flexDirection: 'column',
      marginTop: responsive.padding,
      gap: responsive.smallPadding,
    },

    buttonRowHorizontal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: responsive.padding,
      gap: responsive.smallPadding,
    },

    button: {
      flex: 1,
      paddingVertical: responsive.padding,
      paddingHorizontal: responsive.smallPadding,
      borderRadius: responsive.borderRadius12,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },

    primaryButton: {
      backgroundColor: '#6366F1',
    },

    secondaryButton: {
      backgroundColor: '#EC4899',
    },

    tertiaryButton: {
      backgroundColor: '#8B5CF6',
    },

    buttonText: {
      fontSize: responsive.fontSize14,
      fontWeight: '700',
      color: '#FFFFFF',
    },
  };
};
