import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { totp } from 'otplib';
import { Repository } from 'typeorm';
import * as randomString from 'randomstring';
import { OtpEntity } from './entities';
import { OTP_EMAILS, SEND_OTP_ON_EMAIL } from '../environment';
import { SendOtpDto } from './dto';
import { ERROR_CODES } from '../error-code';
import { UserEntity } from '../user/entities';
import { CountryService } from '../country/country.service';
totp.options = { digits: 6, window: 1, step: 60 };

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,
    private countryService: CountryService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async sendOtpSMS(contactNumber: any, otp: string) {
    const message = `Your xxxx code is: ${otp}. Enter the code in app to verify your phone number."`;
    // send sms logic here
    // await this.smsService.sendSms(contactNumber, message);
  }

  async sendOtpEmail(otpEmails: string[], otp: string) {
    // send email logic here
    // await this.emailService.sendOtpEmail({
    //   productName: PRODUCT_NAME,
    //   receiverEmail: otpEmails,
    //   otp: otp,
    // });
  }

  async createAndSendOtp(data: SendOtpDto) {
    const { mobile_number, country_id } = data;

    const isNewEntry = await this.usersRepository.findOne({
      where: { mobile_number: mobile_number },
    });

    if (!isNewEntry) {
      const otpSecret = await randomString.generate(32);
      const country = await this.countryService.findByID(country_id);

      if (!country) {
        throw new NotFoundException(
          'Country not found',
          ERROR_CODES.COUNTRY_NOT_FOUND,
        );
      }

      const item = {
        otp_secret: otpSecret,
        mobile_number: '+' + country.code + mobile_number,
      };

      const otpCode = await this.generate(otpSecret);

      // call sendOtpSMS
      // await this.sendOtpSMS(item.mobile_number, otpCode);

      if (SEND_OTP_ON_EMAIL !== 'false') {
        await this.sendOtpEmail(OTP_EMAILS.split(','), otpCode);
      }

      return this.otpRepository.save(item);
    }

    throw new BadRequestException(
      'User already exists with this mobile number',
      ERROR_CODES.USER_ALREADY_EXISTS_WITH_THIS_MOBILE_NUMBER,
    );
  }

  async generate(secret: string) {
    return totp.generate(secret);
  }

  async validate(token: string, secret: string) {
    return totp.check(token, secret);
  }

  async verifyOtp(contact: string, otp: string) {
    const dbUser: any = await this.otpRepository.findOne(
      { mobile_number: contact },
      { order: { created_at: 'DESC' } },
    );
    if (dbUser) {
      const isValidOtp = await this.validate(otp, dbUser.otp_secret);
      if (isValidOtp) {
        const verified_at = new Date().toISOString();
        await this.otpRepository.update(
          { id: dbUser.id },
          { otp_verified_at: verified_at },
        );
        return dbUser;
      }
      throw new BadRequestException('Invalid otp', ERROR_CODES.INVALID_OTP);
    }
    throw new NotFoundException(
      'User with given contact number doesn\'t exist',
      ERROR_CODES.USER_NOT_FOUND_WITH_THIS_MOBILE_NUMBER,
    );
  }

  async checkForMobileNumberVerification(mobileNumber: any) {
    const isPresent = await this.otpRepository.findOne({
      mobile_number: mobileNumber,
    });
    if (isPresent) {
      return true;
    }
    return false;
  }
}
