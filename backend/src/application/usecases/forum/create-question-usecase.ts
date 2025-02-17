import { randomUUID } from 'node:crypto';
import { QuestionRepository } from '@/application/repositories';
import { Validator } from '@/application/services';
import {
  Question,
  QuestionDifficulties,
  QuestionDifficulty,
  QuestionStatus,
  QuestionUrgencies,
  QuestionUrgency,
} from '@/domain';
import { notification_devices } from '@/server';


// FCM_SERVER_KEY: Environment variable with the path to your FCM private key file
// FCM_PROJECT_NAME: Your Firebase project name
// FCM_DEVICE_TOKEN: The client's device token (see above in this document)

import { JWT } from 'google-auth-library';
import { env } from '@/env';

function getAccessTokenAsync() {
  return new Promise(function (resolve, reject) {
    const jwtClient = new JWT(
      env.FIREBASE_EMAIL,
      undefined,
      env.FIREBASE_KEY,
      ['https://www.googleapis.com/auth/cloud-platform'],
      undefined
    );
    jwtClient.authorize(function (err, tokens) {
      if (err || !tokens) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

export async function sendFCMv1Notification(deviceToken: string) {
  const firebaseAccessToken = await getAccessTokenAsync();
  
  const messageBody = {
    message: {
      token: deviceToken,
      data: {
        channelId: 'default',
        message: 'Nova dúvida postada!',
        title: `UnBordo`,
        body: JSON.stringify({ title: 'UnBordo', body: 'Nova dúvida postada!' }),
        scopeKey: '@unbordo/wunjo-app',
        experienceId: '@unbordo/wunjo-app',
      },
    },
  };

  const response = await fetch(
   `https://fcm.googleapis.com/v1/projects/unbordo/messages:send`,
   {
     method: 'POST',
     headers: {
       Authorization: `Bearer ${firebaseAccessToken}`,
       Accept: 'application/json',
       'Accept-encoding': 'gzip, deflate',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(messageBody),
   }
  );

  const readResponse = (response: Response) => response.json();
  const json = await readResponse(response);
  console.log(`Response JSON: ${JSON.stringify(json, null, 2)}`);
}
export class CreateQuestionUsecase {
  public static Name = 'CreateQuestionUsecase' as const;

  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly validator: Validator<CreateQuestionUsecase.Input>,
  ) {}

  async execute(
    input: CreateQuestionUsecase.Input,
  ): Promise<CreateQuestionUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const question = await this.questionRepository.create({
      id: randomUUID(),
      subjectId: validatedInput.subjectId,
      title: validatedInput.title,
      description: validatedInput.description,
      points: this.generateQuestionPoints(
        validatedInput.difficulty,
        validatedInput.urgency,
      ),
      difficulty: validatedInput.difficulty,
      urgency: validatedInput.urgency,
      studentId: validatedInput.studentId,
      tutorId: '',
      status: QuestionStatus.OPEN,
      tutors: [],
    });

    for (const deviceToken of notification_devices) {
      sendFCMv1Notification(deviceToken);
    }

    return { question };
  }

  private generateQuestionPoints(
    difficulty: QuestionDifficulties,
    urgency: QuestionUrgencies,
  ) {
    const basePoint = 5;

    const difficultyMultiplier = Object.keys(QuestionDifficulty).indexOf(difficulty) + 1;

    const urgencyMultiplier = Object.keys(QuestionUrgency).indexOf(urgency) + 1;

    return basePoint * difficultyMultiplier * urgencyMultiplier;
  }
}

export namespace CreateQuestionUsecase {
  export type Input = {
    subjectId: string;
    title: string;
    description: string;
    difficulty: QuestionDifficulties;
    urgency: QuestionUrgencies;
    studentId: string;
  };

  export type Output = {
    question: Question;
  };
}
