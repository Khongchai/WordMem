# Generated by Django 3.1.2 on 2021-01-20 11:57

from django.db import migrations, models
import vocabbackend.models


class Migration(migrations.Migration):

    dependencies = [
        ('vocabbackend', '0003_auto_20210119_1914'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='prof_img',
            field=models.ImageField(blank=True, null=True, upload_to=vocabbackend.models.upload_path),
        ),
    ]