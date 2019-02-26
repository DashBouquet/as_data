const ADACCOUNT_FIELDS =
  'id,' +
  'account_id,' +
  'account_status,' +
  'age,' +
  'agency_client_declaration,' +
  'amount_spent,' +
  // 'attribution_spec,' +
  'balance,' +
  // 'business,' +
  'business_city,' +
  'business_country_code,' +
  'business_name,' +
  'business_state,' +
  'business_street,' +
  'business_street2,' +
  'business_zip,' +
  'can_create_brand_lift_study,' +
  'capabilities,' +
  'created_time,' +
  'currency,' +
  'disable_reason,' +
  'end_advertiser,' +
  'end_advertiser_name,' +
  'failed_delivery_checks,' +
  'funding_source,' +
  // 'funding_source_details,' +
  'has_migrated_permissions,' +
  // 'has_page_authorized_adaccount,' + // The parameter page_id is required"
  'io_number,' +
  'is_attribution_spec_system_default,' +
  'is_direct_deals_enabled,' +
  'is_in_3ds_authorization_enabled_market,' +
  'is_in_middle_of_local_entity_migration,' +
  'is_notifications_enabled,' +
  'is_personal,' +
  'is_prepay_account,' +
  'is_tax_id_required,' +
  'line_numbers,' +
  'media_agency,' +
  'min_campaign_group_spend_cap,' +
  'min_daily_budget,' +
  'name,' +
  'offsite_pixels_tos_accepted,' +
  'owner,' +
  'partner,' +
  'rf_spec,' +
  // 'show_checkout_experience,' + // For field 'show_checkout_experience': The parameter page_id is required",
  'spend_cap,' +
  'tax_id,' +
  'tax_id_status,' +
  'tax_id_type,' +
  'timezone_id,' +
  'timezone_name,' +
  'timezone_offset_hours_utc,' +
  // 'tos_accepted,' +
  'user_role,' +
  'user_tos_accepted'


const CAMPAIGN_FIELDS = 'id,' +
  'account_id,' +
  'adlabels,' +
  'bid_strategy,' +
  'boosted_object_id,' +
  'brand_lift_studies,' +
  'budget_rebalance_flag,' +
  'budget_remaining,' +
  'buying_type,' +
  'can_create_brand_lift_study,' +
  'can_use_spend_cap,' +
  'configured_status,' +
  'created_time,' +
  'daily_budget,' +
  'effective_status,' +
  'issues_info,' +
  'lifetime_budget,' +
  'name,' +
  'objective,' +
  'recommendations,' +
  // 'source_campaign,' +
  'source_campaign_id,' +
  'spend_cap,' +
  'start_time,' +
  'status,' +
  'stop_time,' +
  'updated_time'

const AD_FIELDS = 
  'id,' +
  'account_id,' +
  'ad_review_feedback,' +
  'adlabels,' +
  // 'adset,' +
  'adset_id,' +
  'bid_amount,' +
  // 'bid_info,' +
  'bid_type,' +
  // 'campaign,' +
  'campaign_id,' +
  'configured_status,' +
  // 'conversion_specs,' +
  'created_time,' +
  // 'creative,' +
  'effective_status,' +
  'issues_info,' +
  'last_updated_by_app_id,' +
  'name,' +
  'recommendations,' +
  // 'source_ad,' +
  'source_ad_id,' +
  'status,' +
  // 'tracking_specs,' +
  'updated_time'

const ADSET_FIELDS =
  'id,' +
  'account_id,' +
  'adlabels,' +
  'adset_schedule,' +
  // 'attribution_spec,' +
  'bid_amount,' +
  // 'bid_info,' +
  'bid_strategy,' +
  'billing_event,' +
  'budget_remaining,' +
  // 'campaign,' +
  'campaign_id,' +
  'configured_status,' +
  'created_time,' +
  'creative_sequence,' +
  'daily_budget,' +
  'daily_min_spend_target,' +
  'daily_spend_cap,' +
  'destination_type,' +
  'effective_status,' +
  'end_time,' +
  'frequency_control_specs,' +
  'instagram_actor_id,' +
  'is_dynamic_creative,' +
  'issues_info,' +
  'lifetime_budget,' +
  'lifetime_imps,' +
  'lifetime_min_spend_target,' +
  'lifetime_spend_cap,' +
  'name,' +
  'optimization_goal,' +
  'pacing_type,' +
  // 'promoted_object,' +
  'recommendations,' +
  'recurring_budget_semantics,' +
  'rf_prediction_id,' +
  // 'source_adset,' +
  'source_adset_id,' +
  'start_time,' +
  'status,' +
  'targeting,' +
  'time_based_ad_rotation_id_blocks,' +
  'time_based_ad_rotation_intervals,' +
  'updated_time,' +
  'use_new_app_click'

  const INSIGHTS_FIELDS =
  'account_currency,' +
  'account_id,' +
  'account_name,' +
  'action_values,' +
  'actions,' +
  'ad_id,' +
  'ad_name,' +
  'adset_id,' +
  'adset_name,' +
  'buying_type,' +
  'campaign_id,' +
  'campaign_name,' +
  'canvas_avg_view_percent,' +
  'canvas_avg_view_time,' +
  'clicks,' +
  'comparison_node,' +
  'cost_per_10_sec_video_view,' +
  'cost_per_action_type,' +
  'cost_per_estimated_ad_recallers,' +
  'cost_per_inline_link_click,' +
  'cost_per_inline_post_engagement,' +
  'cost_per_outbound_click,' +
  'cost_per_thruplay,' +
  'cost_per_unique_action_type,' +
  'cost_per_unique_click,' +
  'cost_per_unique_inline_link_click,' +
  'cost_per_unique_outbound_click,' +
  'cpc,' +
  'cpm,' +
  'cpp,' +
  'ctr,' +
  'date_start,' +
  'date_stop,' +
  'estimated_ad_recall_rate,' +
  'estimated_ad_recallers,' +
  'frequency,' +
  'impressions,' +
  'inline_link_click_ctr,' +
  'inline_link_clicks,' +
  'inline_post_engagement,' +
  'max_node,' +
  'min_node,' +
  'mobile_app_purchase_roas,' +
  'objective,' +
  'outbound_clicks,' +
  'outbound_clicks_ctr,' +
  'place_page_name,' +
  'reach,' +
  'relevance_score,' +
  'social_spend,' +
  'spend,' +
  'unique_actions,' +
  'unique_clicks,' +
  'unique_ctr,' +
  'unique_inline_link_click_ctr,' +
  'unique_inline_link_clicks,' +
  'unique_link_clicks_ctr,' +
  'unique_outbound_clicks,' +
  'unique_outbound_clicks_ctr,' +
  'video_10_sec_watched_actions,' +
  'video_30_sec_watched_actions,' +
  'video_avg_percent_watched_actions,' +
  'video_avg_time_watched_actions,' +
  'video_p100_watched_actions,' +
  'video_p25_watched_actions,' +
  'video_p50_watched_actions,' +
  'video_p75_watched_actions,' +
  'video_p95_watched_actions,' +
  'video_play_actions,' +
  'video_thruplay_watched_actions,' +
  'website_ctr,' +
  'website_purchase_roas'

const ADS_INSIGHTS_FIELDS =
  'account_currency,' +
  'account_id,' +
  'account_name,' +
  'action_values,' +
  'actions,' +
  'ad_id,' +
  'ad_name,' +
  'adset_id,' +
  'adset_name,' +
  'buying_type,' +
  'campaign_id,' +
  'campaign_name,' +
  'canvas_avg_view_percent,' +
  'canvas_avg_view_time,' +
  'clicks,' +
  'cost_per_10_sec_video_view,' +
  'cost_per_action_type,' +
  'cost_per_estimated_ad_recallers,' +
  'cost_per_inline_link_click,' +
  'cost_per_inline_post_engagement,' +
  'cost_per_outbound_click,' +
  'cost_per_thruplay,' +
  'cost_per_unique_action_type,' +
  'cost_per_unique_click,' +
  'cost_per_unique_inline_link_click,' +
  'cost_per_unique_outbound_click,' +
  'cpc,' +
  'cpm,' +
  'cpp,' +
  'ctr,' +
  'date_start,' +
  'date_stop,' +
  'estimated_ad_recall_rate,' +
  'estimated_ad_recallers,' +
  'frequency,' +
  'impressions,' +
  'inline_link_click_ctr,' +
  'inline_link_clicks,' +
  'inline_post_engagement,' +
  'mobile_app_purchase_roas,' +
  'objective,' +
  'outbound_clicks,' +
  'outbound_clicks_ctr,' +
  'place_page_name,' +
  'reach,' +
  'relevance_score,' +
  'social_spend,' +
  'spend,' +
  'unique_actions,' +
  'unique_clicks,' +
  'unique_ctr,' +
  'unique_inline_link_click_ctr,' +
  'unique_inline_link_clicks,' +
  'unique_link_clicks_ctr,' +
  'unique_outbound_clicks,' +
  'unique_outbound_clicks_ctr,' +
  'video_10_sec_watched_actions,' +
  'video_30_sec_watched_actions,' +
  'video_avg_percent_watched_actions,' +
  'video_avg_time_watched_actions,' +
  'video_p100_watched_actions,' +
  'video_p25_watched_actions,' +
  'video_p50_watched_actions,' +
  'video_p75_watched_actions,' +
  'video_p95_watched_actions,' +
  'video_play_actions,' +
  'video_thruplay_watched_actions,' +
  'website_ctr,' +
  'website_purchase_roas'

const ADSET_INSIGHTS_FIELDS = 
  'account_currency,' +
  'account_id,' +
  'account_name,' +
  'action_values,' +
  'actions,' +
  'ad_id,' +
  'ad_name,' +
  'adset_id,' +
  'adset_name,' +
  'buying_type,' +
  'campaign_id,' +
  'campaign_name,' +
  'canvas_avg_view_percent,' +
  'canvas_avg_view_time,' +
  'clicks,' +
  'comparison_node,' +
  'cost_per_10_sec_video_view,' +
  'cost_per_action_type,' +
  'cost_per_estimated_ad_recallers,' +
  'cost_per_inline_link_click,' +
  'cost_per_inline_post_engagement,' +
  'cost_per_outbound_click,' +
  'cost_per_thruplay,' +
  'cost_per_unique_action_type,' +
  'cost_per_unique_click,' +
  'cost_per_unique_inline_link_click,' +
  'cost_per_unique_outbound_click,' +
  'cpc,' +
  'cpm,' +
  'cpp,' +
  'ctr,' +
  'date_start,' +
  'date_stop,' +
  'estimated_ad_recall_rate,' +
  'estimated_ad_recallers,' +
  'frequency,' +
  'impressions,' +
  'inline_link_click_ctr,' +
  'inline_link_clicks,' +
  'inline_post_engagement,' +
  'max_node,' +
  'min_node,' +
  'mobile_app_purchase_roas,' +
  'objective,' +
  'outbound_clicks,' +
  'outbound_clicks_ctr,' +
  'place_page_name,' +
  'reach,' +
  'relevance_score,' +
  'social_spend,' +
  'spend,' +
  'unique_actions,' +
  'unique_clicks,' +
  'unique_ctr,' +
  'unique_inline_link_click_ctr,' +
  'unique_inline_link_clicks,' +
  'unique_link_clicks_ctr,' +
  'unique_outbound_clicks,' +
  'unique_outbound_clicks_ctr,' +
  'video_10_sec_watched_actions,' +
  'video_30_sec_watched_actions,' +
  'video_avg_percent_watched_actions,' +
  'video_avg_time_watched_actions,' +
  'video_p100_watched_actions,' +
  'video_p25_watched_actions,' +
  'video_p50_watched_actions,' +
  'video_p75_watched_actions,' +
  'video_p95_watched_actions,' +
  'video_play_actions,' +
  'video_thruplay_watched_actions,' +
  'website_ctr,' +
  'website_purchase_roas'

  module.exports = {
    ADACCOUNT_FIELDS,
    CAMPAIGN_FIELDS,
    AD_FIELDS, // https://developers.facebook.com/docs/marketing-api/reference/adgroup
    ADSET_FIELDS, // https://developers.facebook.com/docs/marketing-api/reference/ad-campaign
    // INSIGHTS_FIELDS, // https://developers.facebook.com/docs/marketing-api/reference/adgroup/insights/
    ADS_INSIGHTS_FIELDS, // https://developers.facebook.com/docs/marketing-api/reference/ads-insights/
    // ADSET_INSIGHTS_FIELDS, // https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/insights/
  }