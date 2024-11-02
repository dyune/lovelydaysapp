from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email')


class UserRegistrationSerializer(serializers.ModelSerializer):
    password_1 = serializers.CharField(write_only=True)  # Input only with write, not in output
    password_2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password_1', 'password_2')
        extra_kwargs = {
            'password_1': {'write_only': True},  # Set password forms to write_only
            'password_2': {'write_only': True},
        }

    def validate(self, attrs):
        password_1 = attrs.get('password_1')
        if attrs['password_1'] != attrs['password_2']:
            raise serializers.ValidationError({'password_1': 'Passwords must match.'})

        if len(password_1) < 8:
            raise serializers.ValidationError({'password_1': 'Password must be at least 8 characters long.'})

        return attrs

    def create(self, validated_data):
        password_1 = validated_data.pop('password_1')
        validated_data.pop('password_2')  # Discard the password

        return CustomUser.objects.create_user(password=password_1, **validated_data)


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        else:
            raise serializers.ValidationError({'email': 'Invalid email or password.'})


