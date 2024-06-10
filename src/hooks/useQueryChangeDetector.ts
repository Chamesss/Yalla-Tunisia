import { useEffect, useRef, useState } from 'react';

const useQueryChangeDetector = (setLastVisible: React.Dispatch<any>) => {
    const [query, setQuery] = useState({});

    const previousQuery = useRef('');

    useEffect(() => {
        const parseQueryParams = () => {
            const params = new URLSearchParams(window.location.search);
            const queryObject: any = {};
            params.forEach((value, key) => {
                queryObject[key] = value;
            });
            return queryObject;
        };

        const handleUrlChange = () => {
            const currentQuery = window.location.search;
            if (currentQuery !== previousQuery.current) {
                previousQuery.current = currentQuery;
                console.log('url query changed');
                setLastVisible(null)
                setQuery(parseQueryParams());
            }
        };

        // Initial check
        handleUrlChange();

        // Listen for changes in URL using 'popstate' for browser navigation
        window.addEventListener('popstate', handleUrlChange);

        // Handle URL changes due to 'pushState' and 'replaceState'
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function (...args) {
            const result = originalPushState.apply(this, args);
            handleUrlChange();
            return result;
        };

        history.replaceState = function (...args) {
            const result = originalReplaceState.apply(this, args);
            handleUrlChange();
            return result;
        };

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
        };
    }, []);

    return query;
};

export default useQueryChangeDetector;