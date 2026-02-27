import * as _ from 'lodash';

export class MessageCreateModel {
    static toMessageCreateModel = (entity: any) => {
        return {
            content: _.get(entity, 'content'),
            sender: {
                user_id: _.get(entity, 'sender.user_id'),
                username: _.get(entity, 'sender.username')
            },
            thread_id: _.get(entity, 'thread_id')
        };
    }
};
