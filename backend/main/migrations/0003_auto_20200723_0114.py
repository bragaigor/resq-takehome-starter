# Generated by Django 3.0.8 on 2020-07-23 01:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_workorder'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workorder',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]