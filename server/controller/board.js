import Board from "../business/board";

export function checkWinner(req, res) {
    try {
        var {body: {board}} = req;
        var response = new Board({board}).checkWinner();
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