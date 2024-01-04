/**
 * Function that limits the text characters and embeds the '...' to show that it continues
 * @param arg 
 * @param maxCharacters 
 * @returns 
 */
export const limitTextToMax = (arg: string, maxCharacters: number) => {
    return arg.length > maxCharacters ? `${arg.slice(0, maxCharacters)}...` : arg
}

/**
 * Function that simply returns a sorted array from a list of received arguments
 * @param args 
 * @returns 
 */
export const getSortedArray = (...args: string[]) => args.sort()

/**
 * Function that takes in a string and returns a regex that checks if the given string is within the target text
 * @param filter 
 * @returns 
 */
export const chatFilterRegex = (filter: string) => new RegExp(`.*${filter.trim()}.*`, 'i');

/**
 * Function which applies the regex function on the target string
 * @param testedWord 
 * @param filterWord 
 * @returns 
 */
export const passesFilterCondition = (testedWord: string, filterWord: string) => {
    return chatFilterRegex(filterWord).test(testedWord)
}

type DayOfTheWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

const daysOfTheWeek: DayOfTheWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Function which converts firestore timestamp into our app's preferred timestamp diplay.
 * If the target is within the same day then time is returned.
 * If it is within one week then the day is returned.
 * Otherwise the date is returned
 * @param targetDateInstance 
 * @returns 
 */
export const getProperTimeUpdated = (targetDateInstance: Date) => {
    const targetDay = targetDateInstance.getDay();
    const targetDate = targetDateInstance.getDate();
    const targetMonth = targetDateInstance.getMonth() + 1;
    const targetYear = targetDateInstance.getFullYear();

    const currentDateInstance = new Date();
    const currentDay = currentDateInstance.getDay();
    const currentDate = currentDateInstance.getDate();
    const currentMonth = currentDateInstance.getMonth() + 1;
    const currentYear = currentDateInstance.getFullYear();

    const daysAreSimilar = targetDay === currentDay;
    const targetIsWithinSameDay = daysAreSimilar && (targetDate === currentDate) &&
    (targetMonth === currentMonth) && (targetYear === currentYear);

    if(targetIsWithinSameDay)
        return targetDateInstance.toLocaleTimeString([], { 
            hour: "2-digit", minute: "2-digit" 
        })

    const yesterday = new Date(currentDateInstance);
    yesterday.setDate(currentDate - 1);
    
    if(targetDateInstance.getTime() > yesterday.getTime())
        return 'Yesterday';

    const sevenDaysAgo = new Date(currentDateInstance);
    sevenDaysAgo.setDate(currentDate - 7);

    if(!daysAreSimilar && (targetDateInstance.getTime() > sevenDaysAgo.getTime()))
        return daysOfTheWeek[targetDay];
    
    return `${targetYear}-${targetMonth}-${targetDate}`
}

export const initialNumberOfConversations = 15;

export const initialNumberOfMessages = 15;