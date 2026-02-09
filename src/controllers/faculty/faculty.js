import { getFacultyBySlug, getSortedFaculty } from "../../models/faculty/faculty.js";

// Route handler for the faculty list page
export const facultyListPage = async (req, res) => {
    // Default to sorting by name if no valid sort option is provided
    const validSortOptions = ['name', 'department', 'title'];
    const sortBy = validSortOptions.includes(req.query.sort) ? req.query.sort : 'department';
    // Fetch sorted faculty list
    const facultyList = await getSortedFaculty(sortBy);

    res.render('faculty/list', { 
        title: 'Faculty Directory',
        currentSort: sortBy,
        faculty: facultyList
    });
    
};


// Route handler for individual faculty detail pages
export const facultyDetailPage = async (req, res, next) => {
    const facultySlug = req.params.facultySlug;
    const facultyMember = await getFacultyBySlug(facultySlug);

    // Handle case where faculty member is not found
    if (Object.keys(facultyMember).length === 0) {
        const err = new Error(`Faculty member ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        title: `${facultyMember.name} - Faculty Profile`,
        faculty: facultyMember
    });
};