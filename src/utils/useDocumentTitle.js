import { useRef, useEffect } from 'react';

/**
 * Custom hook to manage the document title.
 * @param {string} title The title to set.
 * @param {boolean} prevailOnUnmount Whether the title should stay after component unmounts.
 */
const useDocumentTitle = (title, prevailOnUnmount = false) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const currentDefaultTitle = defaultTitle.current;
    return () => {
      if (!prevailOnUnmount) {
        document.title = currentDefaultTitle;
      }
    };
  }, [prevailOnUnmount]);
};

export default useDocumentTitle;
