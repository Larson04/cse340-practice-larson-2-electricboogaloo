import { getAllFaculty, getFacultyById, getSortedFaculty } from "../../models/faculty/faculty.js";

// Route handler for the faculty list page
export const facultyListPage = async (req, res) => {
    const facultyList =  getAllFaculty();
    const sortBy = req.query.sort || 'department';
    const sortedFaculty = getSortedFaculty(facultyList, sortBy);

    res.render('faculty/list', { 
        title: 'Faculty Directory',
        faculty: sortedFaculty,
        currentSort: sortBy
    });
    
};

// Route handler for individual faculty detail pages
export const facultyDetailPage = (req, res, next) => {
    
    const facultyId = req.params.facultyId;
    const faculty = getFacultyById(facultyId);

    if (!faculty) {
        const err = new Error(`faculty ${facultyId} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty-detail', {
        title: `${faculty.id} - ${faculty.title}`,
        faculty: faculty, 
    });
};