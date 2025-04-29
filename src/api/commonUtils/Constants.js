export const API_ENDPOINTS = {
  LOGIN: "/crm/user/login",
  REGISTER: "/crm/user/registeration",
  REGISTER_WITH_OTP: "/crm/user/RegisterVerifyOTP",
  ORGANIZATION: "/crm/about/organization",
  FORGOT_PASSWORD: "/crm/products",
  //----------------ITEMS-----------------------------------
  GET_ALL_ITEMS: "/crm/item/list",
  ADD_ITEMS: "/crm/item/add",
  DELETE_ITEMS: "/crm/item/delete",

  VIEW_ITEMS: "/crm/item/view",
  EDIT_ITEMS: "/crm/item/edit",
  //----------------unit-------------------------

  UNIT_LIST: "/crm/unit-list",
  UNIT_CREATE: "/crm/unit/add",
  UNIT_DELETE: "/crm/unit-delete",

  //----------------MANUFACTURE-------------------------
  MANUFACTURE_LIST: "/crm/manufacture/list ", //===>List MANUFACTURE
  MANUFACTURE: "/crm/manufacture/create", //===>MANUFACTURE
  DELETEMANUFACTURE: "/crm/manufacture/delete",

  //----------------BRAND-------------------------

  BRAND_LIST: "/crm/brand/list ", //===>List
  CREATE_BRAND: "/crm/brand/create", //===>cREATE BRAND
  DELETEBRAND: "/crm/brand/delete",

  //-------------Custom View------------------
  CUSTOM_TABLE: "/crm/custom_view/table",
  CUSTOM_CREATE: "/crm/custom_view/create",

  CUSTOM_LIST: "/crm/custom_view/list",

  //----------->>>>>>Composite<<<<<<------------------------------
  CREATE_COMPOSIT_ITEM: "/crm/compositeItem/create",
  LIST_COMPOSIT_ITEM: "/crm/compositeItem/list",
  VIEW_COMPOSIT_ITEM: "/crm/compositeItem/data",
  EDIT_COMPOSIT_ITEM: "/crm/compositeItem/edit",
  DELETE_COMPOSIT_ITEM: "/crm/compositeItem/delete",






  //----------->>>>>>Vendor<<<<<<------------------------------
  LIST_VENDOR: "/crm/list/vendors",


  

};
