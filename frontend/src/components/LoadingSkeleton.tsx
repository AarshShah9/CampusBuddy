import useThemeContext from '~/hooks/useThemeContext';
import { MotiSkeletonProps } from 'moti/build/skeleton/types';
import { Skeleton } from "moti/skeleton";

export default function LoadingSkeleton(props: Omit<MotiSkeletonProps, 'Gradient'>) {
    const { inDarkMode } = useThemeContext();
    const colorMode = inDarkMode ? 'dark' : 'light';

    return (
        <Skeleton colorMode={colorMode} {...props} />
    )
}