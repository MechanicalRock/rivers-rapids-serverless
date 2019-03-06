#!/bin/bash

# AWS_SOURCE_PROFILE - the aws config profile containing your credentials
# AWS_ASSUME_ROLE_PROFILE - the aws config profile containing your role configuration.

# Example:
#
# ~/.aws/credentials:
# [default]
# aws_access_key_id=ANEXAMPLE1
# aws_secret_access_key=ASECRETVALUE
#
# [my_profile]
# aws_access_key_id=ANEXAMPLE2
# aws_secret_access_key=ASECRETVALUE
#
# ~/.aws/config:
# [profile my_assume_role_profile]
# region=ap-southeast-2
# source_profile=my_profile
# role_arn=arn:aws:iam::12345678:role/RoleToAssume
# mfa_serial=arn:aws:iam::22345678:mfa/user.name
#
# Invoke using: $(AWS_SOURCE_PROFILE=my_profile ./assumeRole.sh my_assume_role_profile)

echo "export `AWS_PROFILE=$AWS_SOURCE_PROFILE npx aws-auth-helper $@`"