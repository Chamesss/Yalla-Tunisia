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