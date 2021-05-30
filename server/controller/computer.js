import Computer from "../business/computer";

export function getNextMove(req, res) {
    try {
        var {body: {board, computer, player}} = req;
        var response = new Computer({board, maximizer: computer, minimizer: player}).nextMove();
        res.status(200).send({
            status: 200,
            message: 'Success',
            ...response
        });
    } catch(err) {
        console.log(err);
        res.status(err.getStatus())
        .send(err.getErrorObject());
    }
}