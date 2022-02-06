const PaginatedResults = (model) => {
    return async (req, res, next) => {
        console.log(req.query);

        let page, perPage, field, order, filter, sort;
        if (req.query.pagination) {
            page = JSON.parse(req.query.pagination).page;
            perPage = JSON.parse(req.query.pagination).perPage;
        }

        if (req.query.sort) {
            // field = req.query.sort.field;
            // order = req.query.sort.order;
            sort = JSON.parse(req.query.sort);
            sort = sort.map((item) => item.toLowerCase());
            console.log(sort);
        }

        if (req.query.filter) {
            filter = req.query.filter;
        }

        // IDENTIFY THE INDEXES
        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;

        const results = {};

        // CHECKS IF THERE IS A NEXT PAGE OF RESULTS
        if (endIndex < (await model.countDocuments().exec())) {
            results.next = {
                page: page + 1,
                limit: perPage,
            };
        }

        // CHECKS IF THERE IS A PREVIOUS PAGE OF RESULTS
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: perPage,
            };
        }

        // GET THE DATA FROM THE DATABASE
        try {
            let findFilter = filter ? JSON.parse(filter) : {};
            let limitCount = perPage ? JSON.parse(perPage) : 0;
            let skipCount = startIndex || 0;
            let sorter = sort ? sort : [];

            results.results = await model
                .find(findFilter)
                .sort([sorter])
                .limit(limitCount)
                .skip(skipCount)
                .select("-password")
                .exec();
            results.total = await model.countDocuments().exec();
            res.paginatedResults = results;
            next();
        } catch (err) {
            res.status(500).json({
                message: err.message,
            });
        }
    };
};

module.exports = PaginatedResults;
