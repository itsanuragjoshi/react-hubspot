import clsx from "clsx";

export function Button({
  variant = "default",
  size = "default",
  showIcon = false,
  showText = true,
  positionIcon = "left",
  icon: Icon,
  children,
  className,
  ...props
}) {
  const baseStyles = "flex items-center justify-center uppercase w-max";

  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:opacity-90",
    outline:
      "border border-input bg-background hover:bg-accent",
    ghost: "hover:bg-accent",
    link: "text-blue-500 underline hover:text-blue-600",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-sm gap-1",
    default: "px-3 py-2 text-base gap-1",
    lg: "p-5 text-xl gap-2",
  };

  const iconSize = {
    sm: "w-[1.125rem] h-[1.125rem]",
    default: "w-6 h-6",
    lg: "w-9 h-9",
  };

  const iconPositionStyles = {
    left: "flex-row",
    right: "flex-row-reverse",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        iconPositionStyles[positionIcon],
        "leading-none", // Ensure text has no extra line height
        className
      )}
      {...props}
    >
      {showIcon && Icon && <Icon className={clsx(iconSize[size])} />}{" "}
      {showText && <span className="leading-none">{children}</span>}{" "}
    </button>
  );
}
