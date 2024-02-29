import { FC } from "react";
import { icons } from "lucide-react";

interface ILucideIconProps {
  name: string;
  color?: string;
  size?: number;
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const Icon: FC<ILucideIconProps> = ({
  name,
  color,
  size,
  className,
  onClick,
}) => {
  const LucideIcon = icons[name as keyof typeof icons];

  return (
    <LucideIcon
      color={color}
      size={size}
      onClick={onClick}
      className={className}
    />
  );
};

export default Icon;
