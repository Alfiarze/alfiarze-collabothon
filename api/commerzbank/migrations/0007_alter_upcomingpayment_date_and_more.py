# Generated by Django 5.1.2 on 2024-10-20 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerzbank', '0006_alter_contract_end_date_alter_contract_start_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upcomingpayment',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='upcomingpayment',
            name='time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
