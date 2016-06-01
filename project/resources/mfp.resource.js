module.exports = function(builder) {
    builder.addModule(mfpResource);

    function mfpResource(router, responseHelper) {
        //definition
        router.get('/employees', list);
        router.get('/details', detail);

        //implementation
        var employees = [
            {
                _id: "1",
                first_name: "Bruno",
                last_name: "Paixão",
                img: "img 1",
                job_title: "Frontend developer"
            },
            {
                _id: "2",
                first_name: "Iker",
                last_name: "Martin",
                img: "img 2",
                job_title: "Android developer"
            },
            {
                _id: "3",
                first_name: "Jean Robert",
                last_name: "Alves",
                img: "img 3",
                job_title: "API Badass Developer"
            }
        ];
        
        function list(req, res) {
            res.send(employees);
        }
        
        function detail(req, res) {
            console.log(req.query);
            var id = req.query.id;
            var obj;
            for(var i = 0, len = employees.length; i < len; i++) {
                if(employees[i]._id === id) {
                    obj = employees[i];
                    break;
                }
            }
            console.log(obj);
            res.send(obj);
        }
    }
};
