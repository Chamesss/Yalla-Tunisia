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
  created_at: Date;
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
  picture: string;
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
  materialUsed: string,
  imageUrls: string[],
  dimensions: string[],
  status: boolean,
  disabled: boolean,
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
  sold?: boolean,
  created_at?: Date
}

interface Approvals {
  bName: string,
  bPhone: string,
  businessType: string,
  imagesUrl: string[],
  lat: number,
  lng: number,
  tiles: string[],
  status: boolean,
  userId: string
}