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