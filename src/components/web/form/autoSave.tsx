
import React, { useEffect, useState, useCallback } from 'react'
import { useFormikContext } from 'formik';
import { debounce, isEqual } from 'lodash'
import format from 'date-fns/format';

const AutoSave = ({ debounceMs }) => {
    const formik = useFormikContext();
    const [lastSaved, setLastSaved] = useState<string>('');
    const debouncedSubmit = useCallback(
        debounce(
            () => formik.submitForm().then(() => setLastSaved(format(new Date(), 'HH:mm')))
            ,
            debounceMs
        ),
        [debounceMs, formik.submitForm]
    );

    useEffect(() => {
        if (!isEqual(formik.values, formik.initialValues)) {
            console.log('form debounced')
            debouncedSubmit();
        }
    }, [debouncedSubmit, formik.values]);

    return (
        <>
            {!!formik.isSubmitting
                ? 'saving...'
                : lastSaved
                    ? `Last saved at ${lastSaved}`
                    : null}
        </>
    );
};

export default AutoSave