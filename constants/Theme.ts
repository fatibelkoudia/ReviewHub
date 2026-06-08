import { StyleSheet } from 'react-native';

export const Colors = {
  primary: '#6366F1',        // Indigo
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  secondary: '#EC4899',      // Pink
  success: '#10B981',        // Emerald
  danger: '#EF4444',         // Red
  warning: '#F59E0B',        // Amber
  background: '#F8FAFC',     // Slate 50
  backgroundAlt: '#F1F5F9',  // Slate 100
  card: '#FFFFFF',
  text: '#0F172A',           // Slate 900
  textSecondary: '#64748B',  // Slate 500
  textTertiary: '#94A3B8',   // Slate 400
  border: '#E2E8F0',         // Slate 200
  borderLight: '#F1F5F9',    // Slate 100
  white: '#FFFFFF',
  gray: '#F1F5F9',
};

export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardElevated: {
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.text,
    lineHeight: 24,
  },
  bodySecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textSecondary,
    lineHeight: 21,
  },
  small: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textTertiary,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: Colors.white,
    fontSize: 16,
    color: Colors.text,
  },
  inputMultiline: {
    minHeight: 120,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonSuccess: {
    backgroundColor: Colors.success,
  },
  buttonDanger: {
    backgroundColor: Colors.danger,
  },
  buttonSecondary: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  buttonTextSmall: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  buttonTextSecondary: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 16,
  },
});
