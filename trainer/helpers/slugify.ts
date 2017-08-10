export const Slugify =
    function(text, placholder = '_')
    {
        return text.toString().toLowerCase()
            .replace(/\s+/g, placholder)           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, placholder)         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    };