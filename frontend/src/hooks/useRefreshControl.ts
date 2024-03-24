import { useState, useCallback } from 'react'

export default function useRefreshControl() {
    const [refreshing, setRefreshing] = useState(false);

    const triggerRefresh = useCallback((callback?: () => void) => {
        setRefreshing(true);
        callback && callback();
    }, []);

    const stopRefresh = useCallback(() => {
        setRefreshing(false);
    }, [])

    return ({ refreshing, triggerRefresh, stopRefresh })
}