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
[];

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
};

interface userType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  tel: number;
  picture: string;
  seller: boolean;
  admin: boolean;
  created_at: Date
  lng: number;
  lat: number;
  status: boolean;
  banned: boolean;
  city: [
    {
      id: number | string;
      name: string;
    }
  ];
};