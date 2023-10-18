import { useContext } from 'react';
import { Provider, TranslationContext } from './TranslationProvider';

const useTranslation = (): Provider => useContext(TranslationContext);

export default useTranslation;
