import React from 'react';
import { DatePicker, TimePicker} from 'react-rainbow-components';
import { formatHours, formatDate } from '../../../utils';
import { Div } from 'react-native-magnus';
import { FONTS } from '@my-monorepo/shared-local/src/theme/mobile';

const DateTimePicker = (
    {
        mode,
        isVisible,
        setVisible,
        value,
        onChange,
        width = 90
    }
    : {
        mode: 'date' | 'time',
        isVisible: boolean | 'init',
        setVisible,
        value,
        onChange,
        width?:number
    }) => {
    const timeValue = formatHours(value)

    const onSetTime = (time: string) => {
        const date = new Date();
        const timeParse = time?.split(':')
        if (timeParse.length === 2) {
            date.setHours(parseInt(timeParse[0]))
            date.setMinutes(parseInt(timeParse[1]))
        }
        onChange(null,date)
    }
    return <Div>
        {mode === 'date'
        ? <DatePicker
            id="datePicker-1"
            value={value}
            onChange={date => onChange(null, date)}
            locale="fr-Fr"
            style={{fontFamily : FONTS.Montserrat_500Medium}}
        />
        : <TimePicker
            id="time-picker-1"
            value={timeValue}
            onChange={date => onSetTime(date)}
            hour24
            style={{fontFamily : FONTS.Montserrat_500Medium}}
        />
        }
    </Div>
    }



export default DateTimePicker