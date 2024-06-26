/// <reference types="redux-persist" />


interface IconFilteringProps {
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

interface userType {
  id?: string,
  username: string,
  email: string;
  tel: number;
  picture: string;
  seller: boolean;
  created_at: any;
  lng: number;
  lat: number;
  status: boolean;
  banned: boolean;
  trusted: boolean;
  description: string;
  activeAreaId: string
  businessName?: string | null
  isAdmin: boolean
  balance?: string | number
}

interface userSlice {
  isLogged: boolean,
  user: userType | null,
  userId: string | null
}

interface SubCategoryType {
  id: string;
  name: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}
interface CategoryType {
  id: string;
  name: string;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  subcategories: {
    id: string;
    name: string;
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }[];
}[]

interface creationFromStatus {
  response: {
    success: boolean;
    error: number;
    message: string;
  };
}

interface userInfoType {
  isLogged: boolean,
  user: {
    email: string,
    firstname: string,
    lastname: string,
    location: string,
    picture: string
    isValid?: boolean | null
  },
  userId: string
}

interface ProductHandMade {
  id: string,
  userId: string,
  categoryId: string,
  subCategoryId: string,
  title: string,
  description: string,
  colors: string[],
  price: string,
  location: string,
  qte: string,
  sizes: string[],
  materialsUsed: string,
  imageUrls: string[],
  dimensions: string[],
  status: boolean,
  disabled: boolean,
  keywords: string[],
  sold?: boolean,
  created_at?: Date
}

interface ProductSports {
  id: string,
  userId: string,
  categoryId: string,
  subCategoryId: string,
  title: string,
  description: string,
  duration: string,
  price: string,
  eventType: string,
  location: string,
  grpSize: string,
  imageUrls: string[],
  restrictions: string[],
  timing: string | Date[],
  status: boolean,
  disabled: boolean,
  keywords: string[],
  sold?: boolean,
  created_at?: Date
}

interface ProductGuides {
  id: string,
  userId: string,
  categoryId: string,
  title: string,
  description: string,
  price: string,
  eventType: string,
  imageUrls: string[],
  restrictions: string[],
  timing: string | Date[],
  location: string,
  languages: string[],
  transportation: boolean,
  paymentMethodHourly: boolean,
  status: boolean,
  disabled: boolean,
  keywords: string[],
  sold?: boolean,
  created_at?: Date
}

type Product = ProductGuides | ProductHandMade | ProductSports

interface Approvals {
  id?: string,
  bName: string,
  bPhone: string,
  businessType: string,
  imagesUrl: string[],
  lat: number,
  lng: number,
  tiles: string[],
  status: boolean,
  userId: string,
  locationId: string,
}

interface FavoriteResponse {
  isFavorite: boolean
}

interface FavoritesResponse {
  favorites: string[] | undefined
}

interface Favorites {
  userId: string,
  favorites: {
    id: string,
    ref: string
  }[]
}

interface AllProductsResult {
  Handmades: ProductHandMade[]
  Sports: ProductSports[]
  Guides: ProductGuides[]
}

interface Transaction {
  id: string,
  offerId: string,
  buyerId: string,
  sellerId: string,
  amount: number,
  buyerCompletion: null | boolean,
  sellerCompletion: null | boolean,
}
interface TransactionHandmade extends Transaction {
  color: string,
  size: string,
  qte: number
}

interface TransactionSport extends Transaction {
  duration: string,
  calendar: string,
  grpSize: number
}

interface TransactionGuide extends Transaction {
  duration: string,
  hourly: boolean,
  calendar: string,
  grpSize: number
}