import { NextFunction } from 'express';
import { Tape } from './../model/Tape';
import { inject, injectable } from 'inversify';
import { TapeService } from './../service/TapeService';
import * as Express from 'express';
import { RegistableController } from './RegistableController';
import TYPES from './../types'



@injectable()
export default class TapeController implements RegistableController {
    @inject(TYPES.TapeService) private tapeService!: TapeService;
    register(app: Express.Application): void {
        app.route('/tape')
            .post(
                async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
                    const postTape: Tape = {
                        title: req.body.title,
                        ytUrl: req.body.ytUrl,
                        script: req.body.script,
                        description: req.body.description
                    }
                    const resultTape = await this.tapeService.createTape(postTape);
                    return res.json(resultTape);
                }
            )
            .get(
                async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
                    const queryTitle = req.query.title ? req.query.title : "";
                
                    const tapes = await this.tapeService.findTapebyTitle(queryTitle);
                    res.json(tapes);
                }
            );
        app.route("/tape/:id")
            .get(
                async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
                    try {
                        const tapes = await this.tapeService.findTapebyId(req.params.id);
                        res.json(tapes);
                    } catch (err) {
                        res.status(400).send();
                    }
                }
            )

    }

}