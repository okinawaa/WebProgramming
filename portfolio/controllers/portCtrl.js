const connection = require('../dbConfig')

const resumeCtrl = {
    getPortfolios: async (req, res) => {
        connection.query('SELECT title,category,link,mainText,team, group_concat(image)images FROM portContents ' +
            'LEFT JOIN portImages ON portContents.title = portImages.portContents_title' + ' ' +
            'group by title', (error, rows) => {
            if (error) throw error;
            res.send(rows);
        });
    },
    getPortfolioContents: async (req,res) => {
        const {title} = req.body;
        const sql = `SELECT category,content,id,link,mainText,portContents_title portTitle,team,portDetails.title subject FROM portContents JOIN portDetails ON portContents.title = portDetails.portContents_title where portContents.title = '${title}';
`;
        connection.query(
            sql,
            (error,rows) => {
                if(error) throw error;
                res.send(rows);
            }
        )
    }
    ,
    getPortfolioImages: async (req,res) => {
        const {title} = req.body;
        const sql = `SELECT image FROM portImages
WHERE portContents_title = '${title}'`;
        connection.query(
            sql,
            (error,rows) => {
                if(error) throw error;
                res.send(rows);
            }
        )
    }

}

module.exports = resumeCtrl