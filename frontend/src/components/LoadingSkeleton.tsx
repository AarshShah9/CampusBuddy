import useThemeContext from "~/hooks/useThemeContext";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { MotiSkeletonProps } from "moti/build/skeleton/types";

const Spacer = ({ height }: { height: number }) => (
  <MotiView style={{ height }} />
);

export default function LoadingSkeleton({
  space = 8,
  children,
  show,
  ...props
}: Omit<MotiSkeletonProps, "Gradient"> & { space?: number }) {
  const { inDarkMode } = useThemeContext();
  const colorMode = inDarkMode ? "dark" : "light";
  const skeletonChildren = show ? null : children;
  const backgroundColor = inDarkMode ? undefined : "#d4d4d4";
  return (
    <>
      <Skeleton
        show={show}
        colorMode={colorMode}
        children={skeletonChildren}
        backgroundColor={backgroundColor}
        {...props}
      />
      {show && <Spacer height={space} />}
    </>
  );
}
