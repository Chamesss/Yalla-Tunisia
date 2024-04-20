/// <reference types="redux-persist" />


interface IconFilteringProps {
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

interface Result {
  id: string;
  userId: number;
  title: string;
  description: string;
  color: string[];
  price: string;
  size: string[];
  picture: string;
}

interface ItemType {
  id: string;
  userId: string | number;
  title: string;
  description: string;
  colors: string[];
  price: string | number;
  pictures: string;
  lng: number;
  lat: number;
  status: boolean;
  banned: boolean;
  views: number;
  sizes: string[];
  category: [
    {
      id: number | string;
      name: string;
    }
  ];
  subcategory: [
    {
      id: number | string;
      name: string;
    }
  ];
  city: [
    {
      id: number | string;
      name: string;
    }
  ];
}

interface userType {
  firstname: string;
  lastname: string;
  email: string;
  tel: number;
  picture: string;
  seller: boolean;
  admin: boolean;
  created_at: Date;
  lng: number;
  lat: number;
  status: boolean;
  banned: boolean;
  trusted: boolean;
  description: string;
  city: [
    {
      id: number | string;
      name: string;
    }
  ];
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
  grpSize: string,
  imageUrls: string[],
  restrictions: string[],
  timing: string | string[],
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
  timing: string | string[],
  languages: string[],
  transportation: boolean,
  paymentMethodHourly: boolean
}