 /**
 * @class
 * @returns Each function sanitize the datas
 */
 class Format {
     /**
     * Sanitize an object
     * @param   {object} arg data activity duration
     * @return  {object} sanitize object
     */
    static durationFormat(arg) {
        return arg.data.data.sessions;
    }

    /**
     * Sanitize an object
     * @param   {object} arg data activity
     * @return  {object} sanitize object
     */
    static activityFormat(arg) {
        return arg.data.data.sessions;
    }

    /**
     * Sanitize an object
     * @param   {object} arg data activity intensity
     * @return  {object} sanitize object
     */
    static intensityFormat(arg) {
        return arg.data.data;
    }
}

export default Format;