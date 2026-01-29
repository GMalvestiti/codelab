import { Test, TestingModule } from '@nestjs/testing';
import { RmqContext } from '@nestjs/microservices';
import { EnviarEmailDto } from '../src/core/mail/dto/enviar-email.dto';
import { EnviarEmailService } from '../src/core/mail/enviar-email.service';
import { EnviarEmailController } from '../src/core/mail/enviar-email.controller';

describe('EnviarEmailController (e2e)', () => {
  let controller: EnviarEmailController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: EnviarEmailService;

  const mockEnviarEmailService = {
    enviarWithTemplate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnviarEmailController],
      providers: [
        {
          provide: EnviarEmailService,
          useValue: mockEnviarEmailService,
        },
      ],
    }).compile();

    controller = module.get<EnviarEmailController>(EnviarEmailController);
    service = module.get<EnviarEmailService>(EnviarEmailService);
  });

  it('should send email successfully', async () => {
    const enviarEmailDto: EnviarEmailDto = {
      to: 'john@example.com',
      subject: 'Test Email',
      context: {},
      template: 'welcome.hbs',
      attachments: [],
    };

    const context: RmqContext = {
      getChannelRef: jest.fn().mockReturnValue({ ack: jest.fn() }),
      getMessage: jest.fn(),
    } as unknown as RmqContext;

    mockEnviarEmailService.enviarWithTemplate.mockResolvedValue(undefined);

    await controller.enviarEmail(enviarEmailDto, context);
    expect(mockEnviarEmailService.enviarWithTemplate).toHaveBeenCalledWith(
      enviarEmailDto,
    );
  });

  it('should handle errors when sending email', async () => {
    const enviarEmailDto: EnviarEmailDto = {
      to: 'john@example.com',
      subject: 'Test Email',
      context: {},
      template: 'welcome.hbs',
      attachments: [],
    };

    const context: RmqContext = {
      getChannelRef: jest.fn().mockReturnValue({ ack: jest.fn() }),
      getMessage: jest.fn(),
    } as unknown as RmqContext;

    mockEnviarEmailService.enviarWithTemplate.mockRejectedValue(
      new Error('Email service error'),
    );

    await controller.enviarEmail(enviarEmailDto, context);
    expect(mockEnviarEmailService.enviarWithTemplate).toHaveBeenCalledWith(
      enviarEmailDto,
    );
  });
});
