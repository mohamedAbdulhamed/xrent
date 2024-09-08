export const ROLES = {
    'admin': 'Admin',
    'owner': 'Owner',
    'renter': 'Renter'
  };

export const ALERT_TIMEOUT = 3000;

export const HEADER_HEIGHT = 80;
export const FOOTER_HEIGHT = 150;
export const APPBAR_HEIGHT = 30;

export const LANGUAGES = {
  ar: 'العربية',
  en: 'English',
};

export const TRANSLAITIONS = {
  // Generic
  invalidEmailError: "invalidEmailError",
  requiredEmailError: "requiredEmailError",
  requiredPasswordError: "requiredPasswordError",
  minPasswordError: "minPasswordError",
  requiredFirstNameError: "requiredFirstNameError",
  requiredLastNameError: "requiredLastNameError",
  requiredAddressError: "requiredAddressError",
  requiredPhoneNumberError: "requiredPhoneNumberError" ,
  matchesPhoneNumberError: "matchesPhoneNumberError",
  requiredBirthdayError: "requiredBirthdayError",
  requiredGenderError:  "requiredGenderError",
  failedToFetchError: "failedToFetchError",
  requiredNameError: "requiredNameError",
  minNameError: "minNameError",
  maxNameError: "maxNameError",
  requiredDescriptionError: "requiredDescriptionError",
  minDescriptionError: "minDescriptionError",
  maxDescriptionError: "maxDescriptionError",
  numberPriceError: "numberPriceError",
  requiredRentPriceError: "requiredRentPriceError",
  positivePriceError: "positivePriceError",
  numberDepositError: "numberDepositError",
  requiredDepositError: "requiredDepositError",
  positiveDepositError: "positiveDepositError",
  requiredSalePriceError: "requiredSalePriceError",
  requiredConditionError: "requiredConditionError",
  requiredSizeError: "requiredSizeError",
  requiredColorError: "requiredColorError",
  requiredColorEachError: "requiredColorEachError",
  minColorError: "minColorError",
  requiredCityError: "requiredCityError",
  rangeAvailabilityError: "rangeAvailabilityError",
  requiredImagesError: "requiredImagesError",
  minMaxImagesError: "minMaxImagesError",
  requiredCategoryError: "requiredCategoryError",

  emailLabel: "emailLabel",
  passwordLabel: "passwordLabel",
  firstNameLabel: "firstNameLabel",
  lastNameLabel: "lastNameLabel",
  addressLabel: "addressLabel",
  addressLabelPlaceholder: "addressLabelPlaceholder",
  phoneNumberLabel: "phoneNumberLabel",
  birthDayLabel: "birthDayLabel",
  genderLabel: "genderLabel",
  genderMale: "genderMale",
  genderFemale: "genderFemale",
  cityLabel: "cityLabel",
  cityLabelPlaceholder: "cityLabelPlaceholder",
  zipLabel: "zipLabel",

  // toolbar
  toolbar_search_tooltipTitle: 'toolbar_search_tooltipTitle',
  toolbar_search_placeholder: 'toolbar_search_placeholder',
  toolbar_changeLanguage_tooltipTitle: 'toolbar_changeLanguage_tooltipTitle',
  toolbar_greeting: 'toolbar_greeting',
  toolbar_orders_tooltipTitle: "toolbar_orders_tooltipTitle",
  toolbar_orders: "toolbar_orders",
  toolbar_profile_tooltipTitle: "toolbar_profile_tooltipTitle",
  toolbar_profile: "toolbar_profile",
  toolbar_listings_tooltipTitle: "toolbar_listings_tooltipTitle",
  toolbar_listings: "toolbar_listings",
  toolbar_list_tooltipTitle: "toolbar_list_tooltipTitle",
  toolbar_list: "toolbar_list",
  toolbar_signOut: "toolbar_signOut",
  toolbar_login: "toolbar_login",
  toolbar_wishlist: "toolbar_wishlist",
  toolbar_cart: "toolbar_cart",
  toolbar_notifications: "toolbar_notifications",
  toolbar_notifications_tooltipTitleAllowed: "toolbar_notifications_tooltipTitleAllowed",
  toolbar_notifications_tooltipTitleNotAllowed: "toolbar_notifications_tooltipTitleNotAllowed",
  toolbar_categories: "toolbar_categories",

  // Sidebar
  sidebar_header: "sidebar_header",
  sidebar_byPrice: "sidebar_byPrice",
  sidebar_priceRange: "sidebar_priceRange",
  sidebar_byRating: "sidebar_byRating",
  sidebar_ratingRange: "sidebar_ratingRange",
  sidebar_byCategory: "sidebar_byCategory",
  sidebar_categoryAutocompleteLabel: "sidebar_categoryAutocompleteLabel",
  sidebar_byColour: "sidebar_byColour",
  sidebar_colourAutocompleteLabel: "sidebar_colourAutocompleteLabel",
  sidebar_applyButton: "sidebar_applyButton",

  // ProductCard
  productcard_favorite_tooltipTitleIsFavorited: "productcard_favorite_tooltipTitleIsFavorited",
  productcard_favorite_tooltipTitleIsNotFavorited: "productcard_favorite_tooltipTitleIsNotFavorited",
  productcard_deleteButton: "productcard_deleteButton",
  productcard_deleteButton_toolTipTitle: "productcard_deleteButton_toolTipTitle",
  productcard_editButton: "productcard_editButton",
  productcard_editButton_toolTipTitle: "productcard_editButton_toolTipTitle",
  productcard_viewButton: "productcard_viewButton",
  productcard_viewButton_toolTipTitle: "productcard_viewButton_toolTipTitle",

  // Login
  login_alreadySignedError: "login_alreadySignedError",
  login_headerTitle: "login_headerTitle",
  login_headerSubtitle: "login_headerSubtitle",
  login_rememberMeLabel: "login_rememberMeLabel",
  login_headToRegisterTitle: "login_headToRegisterTitle",
  login_headToRegisterButton: "login_headToRegisterButton",
  login_loginButton: "login_loginButton",

  // Register
  register_headerTitle: "register_headerTitle",
  register_headerSubtitle: "register_headerSubtitle",
  register_headToLoginTitle: "register_headToLoginTitle",
  register_headToLoginButton: "register_headToLoginButton",
  register_registerButton: "register_registerButton",

  // List
  list_headerTitle: "list_headerTitle",
  list_headerSubtitle: "list_headerSubtitle",
  list_productNameLabel: "list_productNameLabel",
  list_descriptionLabel: "list_descriptionLabel",
  list_conditionLabel: "list_conditionLabel",
  list_sizeLabel: "list_sizeLabel",
  list_categoryLabel: "list_categoryLabel",
  list_colourLabel: "list_colourLabel",
  list_isForRentLabel: "list_isForRentLabel",
  list_rentPriceLabel: "list_rentPriceLabel",
  list_depositAmountLabel: "list_depositAmountLabel",
  list_availabilityStartLabel: "list_availabilityStartLabel",
  list_availabilityEndLabel: "list_availabilityEndLabel",
  list_isForSaleLabel: "list_isForSaleLabel",
  list_salePriceLabel: "list_salePriceLabel",
  list_listButton: "list_listButton",

  // Listings
  listings_headToList: "listings_headToList",

  // Profile
  profile_headerTitle: "profile_headerTitle",
  profile_updateButton: "profile_updateButton",

  // Checkout
  checkout_infoTitlte: "checkout_infoTitlte",
  checkout_step1: "checkout_step1",
  checkout_step2: "checkout_step2",
  checkout_step3: "checkout_step3",
  checkout_orderConfirmationTitle: "checkout_orderConfirmationTitle",
  checkout_orderConfirmationDesc: "checkout_orderConfirmationDesc",
  checkout_toOrdersButton: "checkout_toOrdersButton",
  checkout_prevButton: "checkout_prevButton",
  checkout_placeOrderButton: "checkout_placeOrderButton",
  checkout_nextButton: "checkout_nextButton",
};