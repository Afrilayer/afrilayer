// Database Types for Afrilayer

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Enums
export type ListingStatus = 'draft' | 'published' | 'archived';
export type ApiStatus = 'active' | 'deprecated' | 'beta';
export type VerificationStatus = 'verified' | 'pending' | 'unverified';
export type ChangeType = 'create' | 'update' | 'archive';

// Core Entities

export interface AfriCountry {
  id: string;
  name: string;
  slug: string;
  code: string;
  flag_emoji: string | null;
  region: string | null;
  created_at: string;
}

export interface AfriProvider {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  website: string | null;
  logo_url: string | null;
  country_id: string | null;
  founded_year: number | null;
  social_links: Json | null;
  verification_status: VerificationStatus;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
}

export interface AfriCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  created_at: string;
}

export interface AfriTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface AfriApi {
  id: string;
  name: string;
  slug: string;
  provider_id: string;
  description: string | null;
  short_summary: string | null;
  documentation_url: string | null;
  official_website: string | null;
  pricing_model: string | null;
  auth_method: string | null;
  sandbox_url: string | null;
  status: ApiStatus;
  api_version: string | null;
  rate_limit: string | null;
  webhook_support: boolean;
  support_email: string | null;
  support_url: string | null;
  last_verified: string | null;
  last_updated: string | null;
  published_at: string | null;
  listing_status: ListingStatus;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
}

// Junction Tables

export interface AfriApiCountry {
  api_id: string;
  country_id: string;
}

export interface AfriApiCategory {
  api_id: string;
  category_id: string;
}

export interface AfriApiTag {
  api_id: string;
  tag_id: string;
}

// Content & Workflow

export interface AfriCollection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface AfriCollectionItem {
  collection_id: string;
  api_id: string;
  sort_order: number;
}

export interface AfriUpdate {
  id: string;
  title: string;
  slug: string;
  content: string;
  published_at: string;
  created_at: string;
}

export interface AfriReview {
  id: string;
  api_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  content: string;
  created_at: string;
}

export interface AfriChangeHistory {
  id: string;
  entity_type: 'api' | 'provider' | 'category' | 'country' | 'tag';
  entity_id: string;
  changed_by: string | null;
  changes: Json;
  change_type: ChangeType;
  created_at: string;
}

// Future Extensibility

export interface AfriUser {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'provider' | 'user';
  created_at: string;
}

export interface AfriProviderClaim {
  id: string;
  provider_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  message: string | null;
  created_at: string;
}

export interface AfriOrganization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  created_at: string;
}

export interface AfriOrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  created_at: string;
}

// Extended Types with Relations

export interface ApiWithRelations extends AfriApi {
  provider: AfriProvider;
  countries: AfriCountry[];
  categories: AfriCategory[];
  tags: AfriTag[];
}

export interface ProviderWithRelations extends AfriProvider {
  country: AfriCountry | null;
  apis: AfriApi[];
}

// Confidence Indicator

export type ConfidenceLevel = 'verified' | 'needs-review' | 'stale' | 'community';

export interface ConfidenceIndicatorProps {
  lastVerified: string | null;
  verificationStatus: VerificationStatus;
  providerClaimed: boolean;
}

// Form Types

export interface ApiFormData {
  name: string;
  provider_id: string;
  description: string;
  short_summary: string;
  documentation_url: string;
  official_website: string;
  pricing_model: string;
  auth_method: string;
  sandbox_url: string;
  status: ApiStatus;
  api_version: string;
  rate_limit: string;
  webhook_support: boolean;
  support_email: string;
  support_url: string;
  country_ids: string[];
  category_ids: string[];
  tag_ids: string[];
}

export interface ProviderFormData {
  name: string;
  description: string;
  website: string;
  founded_year: number;
  country_id: string;
  social_links: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  verification_status: VerificationStatus;
}