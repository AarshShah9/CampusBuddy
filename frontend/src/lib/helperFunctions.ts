export const limitTextToMax = (arg: string, maxCharacters: number) => {
    return arg.length > maxCharacters ? `${arg.slice(0, maxCharacters)}...` : arg
}

export const getSortedArray = (...args: string[]) => args.sort()

export const chatFilterRegex = (filter: string) => new RegExp(`.*${filter.trim()}.*`, 'i');

export const passesFilterCondition = (testedWord: string, filterWord: string) => {
    return chatFilterRegex(filterWord).test(testedWord)
}

type DayOfTheWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

const daysOfTheWeek: DayOfTheWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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